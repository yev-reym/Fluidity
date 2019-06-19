
//This next function will be the source from which the fluid will flow out of in the simulation
//The frequency is standard emission/second, so 15.0 would equate to 15 particles/capsules emitted per second.

export const FluidEmitter = function (position, frequency = 15.0) {
    this.position = position;
    this.frequency = frequency;

    this.radius = 0.020;
    this.angle = 0;
    this.timer = 0.0;
    this.baseAngle = 60;
    this.angleVelocity = 0;


    this.flowStrength = 10
}