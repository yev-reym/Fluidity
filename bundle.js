/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/fluidity.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/fluidity.js":
/*!*************************!*\
  !*** ./lib/fluidity.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _structures_spatialhash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structures/spatialhash */ "./lib/structures/spatialhash.js");
/* harmony import */ var _structures_particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./structures/particle */ "./lib/structures/particle.js");




document.addEventListener('DOMContentLoaded', () =>{
    const space =  new _structures_spatialhash__WEBPACK_IMPORTED_MODULE_0__["default"](10, [0,0], [20,20])
   
    window.space = space
    window.particle1 = new _structures_particle__WEBPACK_IMPORTED_MODULE_1__["default"]([10, 10], [1, 1], "red");
    window.particle2 = new _structures_particle__WEBPACK_IMPORTED_MODULE_1__["default"]([10, 15], [1, 1], "red");

});

/***/ }),

/***/ "./lib/structures/particle.js":
/*!************************************!*\
  !*** ./lib/structures/particle.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


function particle (pos, vel, color) {
    this.position = pos;
    this.velocity = new p5.Vector(vel[0], vel[1]);

    this.color = color;

}

/* harmony default export */ __webpack_exports__["default"] = (particle);

/***/ }),

/***/ "./lib/structures/spatialhash.js":
/*!***************************************!*\
  !*** ./lib/structures/spatialhash.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (SpatialHash);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map