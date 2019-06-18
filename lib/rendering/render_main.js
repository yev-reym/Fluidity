import * as shaders from '../shader/shaders.js';
import createTexture from 'gl-texture2d';
import createShader from 'gl-shader';
import {SimMesh} from './render_mesh';
import particleImage from '../util/images/particle_no_border.png'
import mat4 from 'gl-matrix/src/gl-matrix/mat4'
import * as constants from '../util/scaling_consts';
import { mat3 } from 'gl-matrix';

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

    _capsuleArc(mesh, center, r, direction, color, numSegments){
        const startIndex = mesh.positionIndex / 2;
        const c = [...color, 1.0];

        //add center vertex
        mesh._coloredVertex(center, c);

        let increment = (Math.PI * 2) / numSegments;
        let incrementIndex = startIndex + 1

        for (let angle = 0; angle <= Math.PI; angle += increment, ++incrementIndex){
            let arcPoint = [center[0] + r * Math.cos(angle + direction), center[1] + r * Math.sin(angle + direction)];

            mesh._coloredVertex(arcPoint, c);

            mesh._addIndex(incrementIndex);
            mesh._addIndex(incrementIndex - 1);
            mesh._addIndex(startIndex);
        }

    }

    //we make a box out of 4 vertices and exactly 2 triangles
    _box(mesh, position, length, color){
        //the origin of the box starts off at the top left corner, which will be our given starting position
        const topLeft = position;
        const topRight = [position[0] + length[0], position[1]];
        const bottomLeft = [position[0], position[1] + length[1]];
        const bottomRight = [position[0] + length[0], position[1] + length[1]];

        const startIndex = mesh.positionIndex / 2;
        const c = [...color, 1.0];

        //color in each vertex that we just calculated 
        mesh._coloredVertex(topLeft, c);
        mesh._coloredVertex(topRight, c);
        mesh._coloredVertex(bottomLeft, c);
        mesh._coloredVertex(bottomRight, c);

        //now that we have colored in the vertices, we will make two triangles to place inside of our buffer. Since two of the six 
        //points will be the same points, in our index buffer we will assign them them the same pointer to the same index in our position buffer
        //so that we are not redundant

        //first triangle
        mesh._addIndex(startIndex);
        mesh._add_Index(startIndex + 1);
        mesh._add_Index(startIndex + 2);

        //second triangle 
        mesh._add_Index(startIndex + 1);
        mesh._addIndex(startIndex + 2);
        mesh._addIndex(startIndex + 3);
    }

    _texturedBox(mesh, position, size, color){
        //the origin of the box starts off at the top left corner, which will be our given starting position
        const topLeft = position;
        const topRight = [position[0] + length[0], position[1]];
        const bottomLeft = [position[0], position[1] + length[1]];
        const bottomRight = [position[0] + length[0], position[1] + length[1]];

        const startIndex = mesh.positionIndex / 2;
        const c = [...color, 1.0];

        //color in each vertex that we just calculated 
        mesh._texturedVertex(topLeft, c, [0.0, 0.0]);
        mesh._texturedVertex(topRight, c, [1.0, 0.0]);
        mesh._texturedVertex(bottomLeft, c, [0.0, 1.0]);
        mesh._texturedVertex(bottomRight, c, [1.0, 1.0]);

        //now that we have colored in the vertices, we will make two triangles to place inside of our buffer. Since two of the six 
        //points will be the same points, in our index buffer we will assign them them the same pointer to the same index in our position buffer
        //so that we are not redundant

        //first triangle
        mesh._addIndex(startIndex);
        mesh._add_Index(startIndex + 1);
        mesh._add_Index(startIndex + 2);

        //second triangle 
        mesh._add_Index(startIndex + 1);
        mesh._addIndex(startIndex + 2);
        mesh._addIndex(startIndex + 3);
    }

    _capsule(mesh, pA, pB, radius, color, numSegments){
        const startIndex = mesh.positionIndex / 2;
        const c = [...color, 1.0];

        //create the vector that connects the two points in our capsule
        const line = new p5.Vector(pA, pB);

        const angle = Math.atan2(line[1], line[0]) - (Math.PI / 2.0);

        //we use the capsule arc helper function to draw the arcs at the end of our capsule structure
        this._capsuleArc(mesh, pA, radius, angle, color, numSegments);
        this._capsuleArc(mesh, pB, radius, angle + Math.PI, color, numSegments );

        //We get a normal to the line segment so that we can draw the box connecting both arcs.
        const normal = [-line[1], line[0]];
        normal.normalize();

        //draw the vertices
        mesh._coloredVertex(p5.Vector.add(pA, normal.mult(r)), c);
        mesh._coloredVertex(p5.Vector.add(pB, normal.mult(r)), c);
        mesh._coloredVertex(p5.Vector.add(pA, normal.mult(-r)), c);
        mesh._coloredVertex(p5.Vector.add(pB, normal.mult(-r)), c);

        //create the triangles 
        mesh._addIndex(startIndex);
        mesh._add_Index(startIndex + 1);
        mesh._add_Index(startIndex + 2);

        mesh._add_Index(startIndex + 1);
        mesh._addIndex(startIndex + 2);
        mesh._addIndex(startIndex + 3);


    }

    draw(collisionObjects, particles, capsule, emitters, editEmitter){
        const CAPSULE_SEGMENTS = 6;
        const CIRCLE_SEGMENTS = 6;
        
        this.particleMesh.setupBufferRender();
        this.containerMesh.setupBufferRender();

        //Make capsule sprites

        for (let i=0; i < collisionObjects.length; ++i){
            let object = collisionObjects[i];

            this._capsule(
                this.containerMesh,
                [object.pA[0] / constants.CONTAINER_SCALE, object.pA[1] / constants.CONTAINER_SCALE],
                [object.pB[0] / constants.CONTAINER_SCALE, object.pB[1] / constants.CONTAINER_SCALE],
                object.radius / constants.CONTAINER_SCALE, 
                object.color,
                CAPSULE_SEGMENTS);

        //Make particle sprites

        for (let j=0; j < particles.length; ++j){
            let particle = particles[i];

            let particlePoint = [particle.position[0] / constants.CONTAINER_SCALE, particle.position[1] / constants.CONTAINER_SCALE];
            let radius = particle.radius / constants.CONTAINER_SCALE;

            this._texturedBox(this.particleMesh, [particlePoint[0] - radius, particlePoint[1] - r], [2 * radius, 2 * radius], particle.color);


            const canvas = document.getElementById('fluidCanvas');
            const canvasGL = canvas.getContext('webgl');

            if (!canvasGL) {
                console.log('WebGL not supported. Falling back on experimental.');
                gl = canvas.getContext('experimental-webgl');
            }

            if (!canvasGL) {
                alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                return;
            }

            canvasGL.clearColor(0.0, 0.0, 0.0, 1.0);
            canvasGL.clear(canvasGL.COLOR_BUFFER_BIT | canvasGL.DEPTH_BUFFER_BIT);

            //setup projection matrix to pass as the uniform matrix in our vertex shader. This will project our vertices into 2d space
            const projectTransform = mat4.create();
            //put in values for left, right, bottom, top, near, and far
            mat4.ortho(projectTransform, 0, this.canvasWidth, this.canvasHeight, 0, -1.0, 1.0);

            //time to bind the shader so that we can process the vertices in our buffer and render them onto the screen
            this.shader.bind();

            canvasGL.getUniformLocation(this.shader, 'uProject') = projectTransform;
            canvasGL.getUniformLocation(this.shader, 'uImage') = this.particleTexture.bind();

            //disable depth testing since we will handle this within our projection transforms
            canvasGL.disable(canvasGL.DEPTH_TEST);

            //Here we use a graphics rendering technique called alpha blending which will render the background with the particles separately
            //to form a composite. The particles will have partial transparency to give them the appearence of fluid when they are together
            canvasGL.enable(canvasGL.BLEND);
            canvasGL.blendFunc(canvasGL.ONE, canvasGL.ONE);
            this.particleMesh.bufferUpdate(canvasGL, this.shader);
            this.particleMesh.draw(canvasGL);

            canvasGL.disable(canvasGL.BLEND);
            this.particleMesh.bufferUpdate(canvasGL, this.shader);
            this.particleMesh.draw(canvasGL);
        }

    }


    }
}