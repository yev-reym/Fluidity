// import { constants } from "../util/scaling_consts";


function Particle (pos, vel, color) {
    this.position = pos;
    this.velocity = new p5.Vector(vel[0], vel[1]);

    this.color = color;
    this.radius = 0.05;

    this.density = 0;
    this.nearDensity = 0;

}

export default Particle;