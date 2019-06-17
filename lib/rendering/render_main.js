import * as shaders from '../shader/shaders.js';
import createTexture from 'gl-texture2d';
import createShader from 'gl-shader';
import {SimMesh} from './render_mesh';
import particleImage from '../util/images/particle_no_border.png'
import * as constants from '../util/scaling_consts';

class Render {
    constructor(glContext, canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.glContext = glContext
        this.shader = createShader(this.glContext, shaders.vert, shaders.frag);
        this.particleMesh = new SimMesh(this.glContext);
        this.containerMesh = new SimMesh(this.glContext);
        this.particleTexture = createTexture(this.glContext, particleImage);
    }

    //return position coordinates in a unit circle using polar conversion
    _unitCircle(position, theta, r){
        return [position[0] + r * Math.cos(theta), pos[1] + r * Math.sin(theta)];
    }

    //to draw this component we need to pass in the mesh that it will update, a center coord to draw the circle around, the radius, color, and segments.
    _circle(){

    }

    _capsuleArc(){

    }

    _box(){

    }

    _texturedBox(){

    }

    _capsule(){

    }

    draw(collisionObjects, particles, capsule, emitters, editEmitter){
        
        this.particleMesh.setupBufferRender();
        this.containerMesh.setupBufferRender();

        //Make capsule sprites

        for (let i=0; i < collisionObjects.length; ++i){

        }


    }
}