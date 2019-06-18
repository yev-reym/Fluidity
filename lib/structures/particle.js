

function Particle (pos, vel, color) {
    this.position = pos;
    this.velocity = new p5.Vector(vel[0], vel[1]);

    this.color = color;

}

export default Particle;