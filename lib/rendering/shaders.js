export const vert = 

//define default medium precision for all floating-point variables
precision mediump float;

//position of vertex being passed to vertex shader
attribute vec2 aPosition;
//get a texture
attribute vec2 aTextCoord;
//our 4 x 4 matrix to tranform to Projection space
uniform mat4 uProject;
//get a color
attribute vec4 aColor
//pass color information to fragment shader
varying vec4 vertColor;
//pass texture information to fragment shader
varying vec2 vertTextCoord;

void main() {
    vertColor = aColor;
    vertTextCoord = aTextCoord;
    // transform new vector consisting of rank-2 position vector into the projection space using projection transformation matrix
    gl_Position = uProject * vect4(aPosition,0.0,1.0);
}


export const frag = 

//define default medium precision for all floating-point variables
 precision mediump float;

//position of vertex being passed to vertex shader
attribute vec2 aPosition;
//get a texture
attribute vec2 aTextCoord;
//our 4 x 4 matrix to tranform to Projection space
uniform mat4 uProject;
//get a color
attribute vec4 aColor
//pass color information to fragment shader
varying vec4 vertColor;
//pass texture information to fragment shader
varying vec2 vertTextCoord;

void main() {
    vertColor = aColor;
    vertTextCoord = aTextCoord;
    // transform new vector consisting of rank-2 position vector into the projection space using projection transformation matrix
    gl_Position = uProject * vect4(aPosition, 0.0, 1.0);
}