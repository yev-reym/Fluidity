
//Create our capsule data type which tightly bounds the particle in a combination of sphere and cylinder 
//primitives. We use the capsule data structure because it makes collision detection easier with more complex systems
//since there is always a line with a surrounding radius to reference, and we just have to compare the sum of the radii of both object-capsules 
//in question. 
//Reference: http://image.diku.dk/projects/media/kelager.06.pdf#page=33

export const Capsule = function(pointA, pointB, radius, color) {
    this.pA = new p5.Vector(pointA[0], pointA[1]);
    this.pB = new p5.Vector(pointB[0], pointB[1]);

    this.radius = radius;
    this.color = color;

};

//Now we create a depth-checker function, also the implicit function of the capsule, which will
//determine whether we have a collision with another capsule
//Relative to a collision-point cp, the function will return a negative number if there is penetration, 
//a positive number if there is not, and 0 if the surfaces are touching flush.
//Reference: http://image.diku.dk/projects/media/kelager.06.pdf#page=33 eq 4.46

export const collisionDepthChecker = function(capsule, x) {

        const pA = capsule.pA;
        const pB = capsule.pB;
        const r = capsule.radius;

        //Check to see if pA needs to be negated due to origin subtraction
        //We now have a vector which represents the line connecting points A and B in our capsule
        const capsuleLine = p5.Vector.sub(pB, pA);

        //Now we will do some algebraic manipulation to ultimately find the parameter t in the parametric equation from
        //Reference: http://image.diku.dk/projects/media/kelager.06.pdf#page=33 eq 4.42
        //First we find the distance between point A and the collision point cp
        const collisionDiffVector = p5.Vector.sub(pA, x);

        //Now we solve for t using the equation 4.43 where we project the collision difference vector (pA - x)
        // onto the capsule internal line segment (pA - pB) and divide this over the absolute sqaure magnitude of the aformentioned
        //segment.
        let t = (-1 * p5.Vector.dot(collisionDiffVector, capsuleLine)) / capsuleLine.magSq();


        //Create clamp function to cap the value of the variable t to a range of [0,1]
        function clamp(num, min, max) {
            return num <= min ? min : num >= max ? max : num;
        }

        let t = clamp(t,0,1);

        //Having solved for t, we can go back to equation 4.42 and solve for l(t)=q, which is the location of the point
        //on the capsule line segment we are interested in with relation to the collision.
        const q = p5.Vector.add(pA,capsuleLine.mult(t));

        //Referencing the original equation 4.40, we solve for and return the implicit function F_capsule. 
        return p5.Vector.mag(q.sub(x)) - r ;
};

//This next function will be the source from which the fluid will flow out of in the simulation
//The frequency is standard emission/second, so 15.0 would equate to 15 particles/capsules emitted per second.

export const FluidEmitter = function(position, frequency=15.0) {
    this.position = position;
    this.frequency = frequency;

    this.radius = 0.020;
    this.angle = 0;


    this.flowStrength = 10
}


