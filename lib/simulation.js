import SpatialHash from './structures/spatialhash';
import Render from './rendering/render_main';
import {cartToPixel} from './rendering/render_mesh';
import SimContainer from './container/simulation_container';
import {Capsule,collisionDepthChecker,FluidEmitter} from './structures/capsule';
import * as constants from './util/scaling_consts';
import Particle from './structures/particle';

class SimulationRunner {
    constructor(glContext){
        this.glContext = glContext;
        this.particles = [];
        this.renderer = new Render(this.glContext);
        this.container = new SimContainer();
        this.hash = new SpatialHash(constants.h, constants.SCALED_CONATINER_MIN, constants.SCALED_CONATINER_MAX);
        this.maxParticles = 1500;
        this.particleCount = this.particles.length;
    }

    particleReset(){
        this.particles = [];
    }

    //We use algorithm 5 from the following paper: http://www.ligum.umontreal.ca/Clavet-2005-PVFS/pvfs.pdf to simulate viscosity impulses
    simulateViscosityImpulses(particleIndex, deltaT){
        const currParticle = this.particles[particleIndex];

        //we want each neighbor pair of the current particle in question, so let us use the spatial hash to find our nearest neighbors
        const neighbors = this.hash.findNearestNeighbors(currParticle);

        //now we want to iterate through each nearest neighbor and create a vector from its position to the current particles
        neighbors.forEach(neighbor => {
            //lets make a vector r_ij 
            rij = p5.Vector.sub(currParticle.position, neighbor.position);

            //now we get the square magnitude of r by taking a dot product with itself
            squareMag = p5.Vector.dot(rij, rij);

            //we take the square root of this to get the magnitude 
            rMag = Math.sqrt(squareMag);

            //we now normailze the vector rij by dividing by its magnitude. This effectively gives us a unit vector pointing in the direction 
            //of rij
            rNorm = p5.Vector.scale(rij, 1.0 / rMag);

            //we set a parameter q to be the magnitude of rij divided by the support radius. we subtract this quantity from 1 
            // as we will need it later to calculate the impulse parameter in the algorithm
            q = rMag / constants.h;
            one_minus_q = 1 - q;

            //lets calculate the vector connecting the velocities in the velocity field of the two particles 
            vij = p5.Vector.sub(currParticle.velocity, neighbor.velocity);

            //calculate u parameter from the algorithm 
            u = p5.Vector.dot(vij, rNorm);

            const alpha = this.container.alpha;
            const beta = this.container.beta;

            let I;

            if (u > 0){
                I = deltaT * one_minus_q * ((alpha * u) + (beta * u ** 2));

                // if (I < u){
                //     I = I
                // } else {
                //     I = u
                // }
            } else {
                I = deltaT * one_minus_q * ((alpha * u) - (beta * u ** 2
                    ));

            //     if (I > u) {
            //         I = I
            //     } else {
            //         I = u
            //     }
            }

            //Now we divide I in half 
            halvedI = I / 2.0;

            currParticle.velocity = p5.Vector.add(currParticle.velocity, p5.Vector.scale(halvedI, -1.0));
            neighbor.velocity = p5.Vector.add(neighbor.velocity, p5.Vector.scale(halvedI, 1.0));
        });
    }

    computeDensities(particleIndex){
        //Use algorithm 2 for calculating densities, both rest density and near density
        const currParticle = this.particles[particleIndex];
        const neighbors = this.hash.findNearestNeighbors(currParticle);

        neighbors.forEach(neighbor => {
            //lets make a vector r_ij 
            rij = p5.Vector.sub(currParticle.position, neighbor.position);

            //now we get the square magnitude of r by taking a dot product with itself
            squareMag = p5.Vector.dot(rij, rij);

            //we take the square root of this to get the magnitude 
            rMag = Math.sqrt(squareMag);

            //we set a parameter q to be the magnitude of rij divided by the support radius. we subtract this quantity from 1 
            // as we will need it later to calculate the impulse parameter in the algorithm
            q = rMag / constants.h;
            one_minus_q = 1 - q;

           if (q < 1){
                neighbor.density += one_minus_q ** 2;
                neighbor.nearDensity += one_minus_q ** 3;
           }

        })
        
    }

    //this will handle the algorithm for calculating doubleDensityRelaxation
    doubleDensityRelaxation(deltaT){
        //first we compute the pressure and near pressure based on particle density per particle
        this.particles.forEach(particle => {
            //to calculate the pressure we use the constant k, which is a parameter describing the stiffness interactions between neighboring
            //particles
            P = this.container.stiffness * (particle.density - this.container.restDensity);
            nearP = this.container.nearStiffness * particle.nearDensity;

            const neighbors = this.hash.findNearestNeighbors(currParticle);

            //now we want to iterate through each nearest neighbor and create a vector from its position to the current particles
            neighbors.forEach(neighbor => {
                dx = 0
                //lets make a vector r_ij 
                rij = p5.Vector.sub(currParticle.position, neighbor.position);

                //now we get the square magnitude of r by taking a dot product with itself
                squareMag = p5.Vector.dot(rij, rij);

                //we take the square root of this to get the magnitude 
                rMag = Math.sqrt(squareMag);

                //we now normailze the vector rij by dividing by its magnitude. This effectively gives us a unit vector pointing in the direction 
                //of rij
                rNorm = p5.Vector.scale(rij, 1.0 / rMag);

                //we set a parameter q to be the magnitude of rij divided by the support radius. we subtract this quantity from 1 
                // as we will need it later to calculate the impulse parameter in the algorithm
                q = rMag / constants.h;
                one_minus_q = 1 - q;

                if (q < 1){
                
                    //now we apply displacements
                    D = (deltaT**2)*((P * one_minus_q) + nearP * one_minus_q**2)*rNorm;

                    halvedD = D / 2.0;
                    neighbor.position = neighbor.position + halvedD;
                    dx = dx - halvedD;
                    currParticle.position = currParticle.postion + dx;

                }
            })
        });
    }

    handleCapsuleCollisions(){
        //handle the collision checks with capsules. this information was found from 
        //http://image.diku.dk/projects/media/kelager.06.pdf#page=33

    }

    draw(){
        this.renderer.draw(this.glContext, this.container.collisionObjects, this.particles)
        this.hash.populateGrid(this.particles);
    }

    runFluidEmitter(deltaT){
        this.container.emittersCreated.forEach(emitter => {
            //increment the timer on the emitter by the change in time
            emitter.timer += deltaT

            const emissionPeriod = 1.0 / emitter.frequency

            //keep emitting particles unless max particle limit has been reached 
            if (emitter.timer > emissionPeriod && this.particleCount < this.maxParticles){

                //convert from degrees to radians
                const angle = emitter.angle * (Math.PI / 180.0);
                const strength = emitter.flowStrength

                this.particles.push(new Particle([0,0], [1,1], [0.0, 0.5, 0.0]))
            }
        })
    }

    updateSimulation(deltaT){
        this.runFluidEmitter(deltaT);

    }

}

export default SimulationRunner;
