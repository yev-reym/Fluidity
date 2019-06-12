import SpatialHash from './structures/spatialhash';
import particle from './structures/particle';


document.addEventListener('DOMContentLoaded', () =>{
    const space =  new SpatialHash(10, [0,0], [20,20])
   
    window.space = space
    window.particle1 = new particle([10, 10], [1, 1], "red");
    window.particle2 = new particle([10, 15], [1, 1], "red");

});