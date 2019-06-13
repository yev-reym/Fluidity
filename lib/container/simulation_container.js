import {Capsule, FluidEmitter} from '../structures/capsule';



//Here we set the properties of the container that the simulation will be run in 
function SimContainer() {
    
    this.coRestitution = 3.0 / 5.0;

    //From Measuring the Effects of Artificial Viscosity in SPH
    //Simulations of Rotating Fluid Flows research paper, there is an artificial vsicosity term which contains two parameters scaling parameters 
    //alpha and beta.
    //"The artificial viscosity term possesses two other terms to mimic naturally occuring, dissipative processes.
    //The first linear term provides both the bulk and shear viscosity of the converging particles, while the second quadratic term 
    //functions as artificial viscosity for shock handling and for preventing interparticle penetration.It should
    // be noted that this single artificial viscosity provides both shear and bulk viscosities, which would be given by separate terms 
    //in the physical, Navier - Stokes description.In many SPH prescriptions the linear and quadratic terms are
    // scaled by separate free parameters, αv and βv, respectively, each with a range of ‘typical’ values, but we here follow the
    //practice of setting β = 3α(unless otherwise stated)."
    
    this.alpha = 0.3;
    this.beta = 0.9;

    //We implement here the rest density and the stiffness, parameters defined in the following paper:
    //http://www.ligum.umontreal.ca/Clavet-2005-PVFS/pvfs.pdf

    this.restDensity = 10.0;
    this.stiffness = 0.004;
    this.nearStiffness = 0.01;

    this.colors = { 0:'blue', 1:'red', 2:'green' }
    this.capsuleColor = this.colors[0];

    this.emittersCreated = [];
    this.capsulesCreated = [];

    //Below we create our default container settings when first rendering the simulation 
    //We start by creating an emitter and inputting a random starting coordinate
    this.emittersCreated.push(new FluidEmitter([10,20]));
}

export default SimContainer;