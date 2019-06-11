
function cell(x, y, resolution, diff, visc, density) {
    //store the cell's position
    this.pos = createVector(x,y);

    //store the cell's resolution(size)
    this.res = resolution;

    //store the cell's velocity vector
    this.vel = createVector(vx, vy);

    //store the rate of diffusion(how fast the fluid spreads)
    this.diff = diff;
    
    //store the viscosity of the fluid(the damping rate of a fluid)
    this.visc = visc;

    //store the density of the fluid, which will be homogenous throughout the fluid
    this.dens = density

}