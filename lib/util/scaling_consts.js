
export const CONTAINER_SCALE = 100;

// To obtain the radius of a rendered particle, we multiply its radius by this constant.
// so we can use this constant to make particles appear larger than they are in the simulation.
export const renderMult = 1.0;


// this is the min and max points of the simulation world.
export const CONTAINER_MIN = [-1.0, -1.0];
export const CONTAINER_MAX = [+1.0, +1.0];

// however, we scale the entire simulation world by WORLD_SCALE, in order to make
// sure that it doesn't run too fast.
export const SCALED_CONATINER_MIN = [CONATINER_MIN[0] * CONATINER_SCALE, CONATINER_MIN[1] * CONATINER_SCALE];
export const SCALED_CONATINER_MAX = [CONATINER_MAX[0] * CONATINER_SCALE, CONATINER_MAX[1] * CONATINER_SCALE];

export const h = 0.015 * CONTAINER_SCALE; // support radius