//Here we create a spatial hash data structure class to be able to find the nearest neighboring particles of a particular particle.
//We create a grid system of cells so that our particle in question resides in a cell. We then check how many particles are located 
//within that same cell. We space the cells based on a support radius s, which is the maximum radius of influence for a particle.
//Basically, the particle has some sort of influence to other particles since it has a finite radius and is not an actual point with 0
//dimension. Thus, the influence, on a scale of 0 to 1, would be 0 at the radius, and progressively increases to 1 the closer oen gets to the center. 
// Implementing a hash-map allows us to do this in O(1) time instead of O(n) if we used  an array as a data structure.


//We begin by setting up our grid, which has a bottom-left min coordinate and a top-right vertex grid-coordinate max. Using these two
//points we can construct the cells within this grid. 
class SpatialHash {
    constructor(s, gridMin, gridMax ){
        this.s = s;
        this.min = gridMin;
        this.max = gridMax;

        //Compute dimensions of a single cell
        this.cellX = Math.floor((this.max[0] - this.min[0]) / this.s);
        this.cellY = Math.floor((this.max[1] - this.min[1]) / this.s);

        //Initialize grid and the spatial hash
        this.grid = [];
        this.spatialHash = {};
    }

    // We create a helper function which will take a coordinate in our grid mesh and will output
    // a grid position in our grid array. We subtract relative to the min coordinate as this is a natural way 
    // to read postions in a grid and will give a more intuitive position coordinate. 
    _gridPos(position){
        return [
            Math.floor((position[0] - this.min[0]) / this.s),
            Math.floor((position[1] - this.min[1]) / this.s)
        ]
    }

    //Convert grid position e.g (grid[2][3]) to index of cells (grid[5])
    _gridIndex(gridPos){
        return gridPos[1] + gridPos[0];
    }

    populateGrid(particles){

        //initialize grid matrix (nest the grid)
        for (let i=0; i < this.cellX * this.cellY;  ++i){
            grid[i] = [];
        }

        //populate the grid with particles
        for (let numParticle = 0; numParticle < )


    }

}