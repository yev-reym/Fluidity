import SpatialHash from './structures/spatialhash';
import particle from './structures/particle';
import {particleImg} from './rendering/render';

document.addEventListener('DOMContentLoaded', () =>{
    const space =  new SpatialHash(5, [2,2], [40,40])
   
    window.space = space
    window.particle1 = new particle([10, 10], [1, 1], "red");
    window.particle2 = new particle([10, 15], [1, 1], "red");
    window.particle3 = new particle([2, 35], [1, 1], "red");
    window.particle4 = new particle([2, 30], [1, 1], "red");
    window.particle5 = new particle([5, 35], [1, 1], "red");
    window.particleImg = particleImg;


    const canvas = document.getElementById('fluidCanvas');
    const canvasGL = canvas.getContext('webgl');

    if (canvasGL === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    canvasGL.clearColor(0.0, 0.0, 0.0, 1.0);
    canvasGL.clear(canvasGL.COLOR_BUFFER_BIT);

});