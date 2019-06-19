import SpatialHash from './structures/spatialhash';
import particle from './structures/particle';
import {Capsule} from './structures/capsule';
import * as constants from './util/scaling_consts';
import Render from './rendering/render_main';

document.addEventListener('DOMContentLoaded', () =>{
    const space =  new SpatialHash(5, [2,2], [40,40])

    const canvas = document.getElementById('fluidCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, 1100, 750);

    window.context = context;
    window.space = space
    window.particle1 = new particle([10, 10], [1, 1], "red");
    window.particle2 = new particle([10, 15], [1, 1], "red");
    window.particle3 = new particle([2, 35], [1, 1], "red");
    window.particle4 = new particle([2, 30], [1, 1], "red");
    window.particle5 = new particle([5, 35], [1, 1], "red");
    window.vector1 = new p5.Vector(1, 2);
    window.vector2 = new p5.Vector(9, 10);
    window.capsule = new Capsule(constants.CONTAINER_MIN, [constants.CONTAINER_MIN[0], constants.CONTAINER_MAX[1]], 15, {'r':255, 'g':255, 'b': 51})
    window.render = new Render(context, canvas.width, canvas.height);

 
    
    //how to draw semicircle of a capsule
    // context.beginPath();
    // context.fillStyle = 'rgb(255,255,51)';
    // context.arc(500, 500, 15, 1.5* Math.PI, 0.5*Math.PI);
    // context.fillRect(400,485, 100, 30);
    // context.arc(400, 500, 15, 0.5 * Math.PI, 1.5 * Math.PI);
    // context.fill();
    // context.closePath();

});