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
        this.cellX = Math.round((this.max[0] - this.min[0]) / this.s);
        this.cellY = Math.round((this.max[1] - this.min[1]) / this.s);

        //Initialize grid and the spatial hash
        this.grid = [];
        this.spatialHash = {};

        this._gridPos = this._gridPos.bind(this);
        this._gridIndex = this._gridIndex.bind(this);
        this.populateGrid = this.populateGrid.bind(this);
        this.findNearestNeighbors = this.findNearestNeighbors.bind(this);
    }

    // We create a helper function which will take a coordinate from the canavs system and apply it to our grid mesh.
    // We subtract relative to the min coordinate as this is a natural way 
    // to read postions in a grid and will give a more intuitive position coordinate. For example, the coordinate [9,19] in a 
    //20*20 canvas with the min at the origin would give us a position of [0,1].
    _gridPos(position){
        return [
            Math.floor((position[0] - this.min[0]) / this.s),
            Math.floor((position[1] - this.min[1]) / this.s)
        ]
    }

    //Convert grid position e.g (grid[0,1]) to index of cells (grid[1])
    _gridIndex(gridPos){
        return gridPos[1] * this.cellX + gridPos[0];
    }

    populateGrid(particles){

        //initialize grid matrix (nest the grid)
        for (let i=0; i < this.cellX * this.cellY; ++i){
            this.grid[i] = [];
        }

        //populate the spatial hash with all our cells and make their values arrays so we can push into them later
        for (let j=0; j < this.cellX; ++j) {
            for (let k=0; k < this.cellY; ++k){
                this.spatialHash[[j,k]] = []
            }
        }
        
        

        //populate the grid with particles
        for (let ithParticle = 0; ithParticle < particles.length; ++ithParticle){
            //first grab the particle from the particles array
            let currentParticle = particles[ithParticle];

            //now create the postion of the particle on the grid based off of the particles position
            let particleOnGrid = this._gridPos(currentParticle.position);
            
            //push this particle into the grid array using our converter function to convert grid position to index
            this.grid[this._gridIndex(particleOnGrid)].push(currentParticle);

            //Now we want to set the position key in our spatial hash
            this.spatialHash[particleOnGrid].push(currentParticle)
        }


    }

    //find particles that are within the bounding box whose dimensions are bound by the support radius of the particle
    findNearestNeighbors(particle){
        //first we get the bounding box boundaries
        debugger
        const boundingBoxMins = this._gridPos([particle.position[0] - this.s, particle.position[1] - this.s]);
        const boundingBoxMaxs = this._gridPos([particle.position[0] + this.s, particle.position[1] + this.s]);

        const bbXmin = boundingBoxMins[0];
        const bbXmax = boundingBoxMaxs[0];
        const bbYmin = boundingBoxMins[1];
        const bbYmax = boundingBoxMaxs[1];

        //this will be the array that will store our neighbors within the support radius
        const neighbors = [];

        const cells = Object.keys(this.spatialHash);
        
        cells.forEach((cell) => {
           // if () check to see if cell is within the bounds of the bounding box, and if it is then 
           //concat the values into the array, but exclude the particle in the argument
        })




        
    }

}

export default SpatialHash;