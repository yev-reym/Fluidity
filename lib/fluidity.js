
//This will be the the main function that renders the simulation. We begin by initializing some parameters of the canvas itself and then hooking
//into the canvas element.

(function (context, numParticles) {
        const canvas, ctx;


        //Variable to store mouse position
        const mousePos = {
            x: 0,
            y: 0,
            pressed: false
        }

        //Setup resolution, which will be length of one side of the square cell
        const resolution = 10;

        //set the radius of the mouse cursor when user interacts with particles
        const mRadius = 20;
        
        //set the number of columns and rows in the grid, found by dividing height and width by resolution
        const numCol = 1000 / resolution;
        const numRow = 1000 / resolution;

        //set variable to the number of particles to be made, dependent on user input 
        const particleCount = numParticles;

        //set a variable to contain grid cells and an array to hold the particles
        const grid = [];
        const particles = [];

        //Now we create the function which will create the hook, configure the grid and set the particles, and then render 

}(window));