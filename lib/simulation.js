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
}
