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
/* harmony import */ var _structures_capsule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structures/capsule */ "./lib/structures/capsule.js");
/* harmony import */ var _util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/scaling_consts */ "./lib/util/scaling_consts.js");
/* harmony import */ var _rendering_render_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rendering/render_main */ "./lib/rendering/render_main.js");






document.addEventListener('DOMContentLoaded', () =>{
    const space =  new _structures_spatialhash__WEBPACK_IMPORTED_MODULE_0__["default"](5, [2,2], [40,40])

    const canvas = document.getElementById('fluidCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, 1100, 750);

    window.context = context;
    window.space = space
    window.particle1 = new _structures_particle__WEBPACK_IMPORTED_MODULE_1__["default"]([10, 10], [1, 1], "red");
    window.particle2 = new _structures_particle__WEBPACK_IMPORTED_MODULE_1__["default"]([10, 15], [1, 1], "red");
    window.particle3 = new _structures_particle__WEBPACK_IMPORTED_MODULE_1__["default"]([2, 35], [1, 1], "red");
    window.particle4 = new _structures_particle__WEBPACK_IMPORTED_MODULE_1__["default"]([2, 30], [1, 1], "red");
    window.particle5 = new _structures_particle__WEBPACK_IMPORTED_MODULE_1__["default"]([5, 35], [1, 1], "red");
    window.vector1 = new p5.Vector(1, 2);
    window.vector2 = new p5.Vector(9, 10);
    window.capsule1 = new _structures_capsule__WEBPACK_IMPORTED_MODULE_2__["Capsule"]([_util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MIN"][0], _util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MIN"][1] + 30], [_util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MAX"][0], _util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MIN"][1] + 30], 15, {'r':255, 'g':255, 'b': 51})
    // window.capsule = new Capsule([constants.CONTAINER_MIN[0], constants.CONTAINER_MIN[1] + 15], [constants.CONTAINER_MIN[0], constants.CONTAINER_MAX[1] + 15], 15, { 'r': 255, 'g': 255, 'b': 51 })    
    window.capsule2 = new _structures_capsule__WEBPACK_IMPORTED_MODULE_2__["Capsule"]([_util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MIN"][0], _util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MAX"][1] - 15], [_util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MAX"][0], _util_scaling_consts__WEBPACK_IMPORTED_MODULE_3__["CONTAINER_MAX"][1] - 15], 15, { 'r': 255, 'g': 255, 'b': 51 })   
    window.capsule3 = new _structures_capsule__WEBPACK_IMPORTED_MODULE_2__["Capsule"]([400, 500], [600, 700], 15, { 'r': 255, 'g': 255, 'b': 51 });       
    window.render = new _rendering_render_main__WEBPACK_IMPORTED_MODULE_4__["default"](context, canvas.width, canvas.height);

 
    
    //how to draw semicircle of a capsule
    // context.beginPath();
    // context.fillStyle = 'rgb(255,255,51)';
    // context.arc(500, 500, 15, 1.5* Math.PI, 0.5*Math.PI);
    // context.fillRect(400,485, 100, 30);
    // context.arc(400, 500, 15, 0.5 * Math.PI, 1.5 * Math.PI);
    // context.fill();
    // context.closePath();

});

/***/ }),

/***/ "./lib/rendering/render_main.js":
/*!**************************************!*\
  !*** ./lib/rendering/render_main.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_scaling_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/scaling_consts */ "./lib/util/scaling_consts.js");
// import particleImage from '../util/images/particle_no_border.png'


class Render {
    constructor(context, canvasWidth, canvasHeight){
     this.context = context;
     this.canvasWidth = canvasWidth;
     this.canvasHeight = canvasHeight;
    }

    draw(){

    }

    _drawCapsule(capsule){
            let startPoint = capsule.pA;
            let endPoint = capsule.pB;
            let lineSegmentLength = endPoint.dist(startPoint) ; 
            
            debugger
            //for now just draw the frame, will later update for allowing users to draw capsules
            //top
            this.context.beginPath();
            this.context.fillStyle = 'rgb(255,255,51)';
            this.context.arc(endPoint['x'], endPoint['y'] - capsule.radius, capsule.radius, 1.5 * Math.PI, 0.5 * Math.PI);
            this.context.fillRect(startPoint['x'], startPoint['y'] - capsule.radius, lineSegmentLength , 30);
            this.context.arc(startPoint['x'], startPoint['y'] - capsule.radius, capsule.radius, 0.5 * Math.PI, 1.5 * Math.PI);
            this.context.fill();
            this.context.closePath();

            
    }

    _drawParticle(){

    }

}

/* harmony default export */ __webpack_exports__["default"] = (Render);

/***/ }),

/***/ "./lib/structures/capsule.js":
/*!***********************************!*\
  !*** ./lib/structures/capsule.js ***!
  \***********************************/
/*! exports provided: Capsule, capsuleImplicit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Capsule", function() { return Capsule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capsuleImplicit", function() { return capsuleImplicit; });
/* harmony import */ var _util_scaling_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/scaling_consts */ "./lib/util/scaling_consts.js");

//Create our capsule data type which tightly bounds the particle in a combination of sphere and cylinder 
//primitives. We use the capsule data structure because it makes collision detection easier with more complex systems
//since there is always a line with a surrounding radius to reference, and we just have to compare the sum of the radii of both object-capsules 
//in question. 
//Reference: http://image.diku.dk/projects/media/kelager.06.pdf#page=33

const Capsule = function(pointA, pointB, radius, color) {
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

const capsuleImplicit = function(capsule, x) {

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

        t = clamp(t,0,1);

        //Having solved for t, we can go back to equation 4.42 and solve for l(t)=q, which is the location of the point
        //on the capsule line segment we are interested in with relation to the collision.
        const q = p5.Vector.add(pA,capsuleLine.mult(t));

        //Referencing the original equation 4.40, we solve for and return the implicit function F_capsule. 
        return p5.Vector.mag(q.sub(x)) - r ;
};





/***/ }),

/***/ "./lib/structures/particle.js":
/*!************************************!*\
  !*** ./lib/structures/particle.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import { constants } from "../util/scaling_consts";


function Particle (pos, vel, color) {
    this.position = pos;
    this.velocity = new p5.Vector(vel[0], vel[1]);

    this.color = color;
    this.radius = 0.05;

    this.density = 0;
    this.nearDensity = 0;

}

/* harmony default export */ __webpack_exports__["default"] = (Particle);

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
        const boundingBoxMins = this._gridPos([particle.position[0] - this.s, particle.position[1] - this.s]);
        const boundingBoxMaxs = this._gridPos([particle.position[0] + this.s, particle.position[1] + this.s]);

        //introduce the clamp function again to filter bounding box range to be inside our grid if on the outside
        function clamp(num, min, max) {
            return num <= min ? min : num >= max ? max : num;
        }

        const bbXmax = clamp(boundingBoxMaxs[0], 0, this.cellY-1);
        const bbXmin = clamp(boundingBoxMins[0], 0, this.cellY-1);
        const bbYmin = clamp(boundingBoxMins[1], 0, this.cellY-1);
        const bbYmax = clamp(boundingBoxMaxs[1], 0, this.cellY-1);

        //this will be the array that will store our neighbors within the support radius
        let neighbors = [];

        const cells = Object.keys(this.spatialHash);

        //check to see if cell is within the bounds of the bounding box, and if it is then 
        //concat the values into the array
        cells.forEach((cell) => {
            if ((parseInt(cell[0]) >= bbXmin && parseInt(cell[0]) <= bbXmax) && (parseInt(cell[2]) >= bbYmin && parseInt(cell[2]) <= bbYmax)){
                neighbors = neighbors.concat(this.spatialHash[cell])
            }
        })

        //use this function to filter out particle we are finding neighbors for, since we added it to our neighbors array
        function particleFilter(value){
            return value.position !== particle.position
        }

        //return the nearest neighbors
        return neighbors.filter(particleFilter);
        
    }

}

/* harmony default export */ __webpack_exports__["default"] = (SpatialHash);

/***/ }),

/***/ "./lib/util/scaling_consts.js":
/*!************************************!*\
  !*** ./lib/util/scaling_consts.js ***!
  \************************************/
/*! exports provided: CONTAINER_MIN, CONTAINER_MAX, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINER_MIN", function() { return CONTAINER_MIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINER_MAX", function() { return CONTAINER_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });

// this is the min and max points of the simulation world.
const CONTAINER_MIN = [0, 0];
const CONTAINER_MAX = [1100, 750];


const h = 10; // support radius

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map