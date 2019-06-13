export const vert = 

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
varying vec2 vertTexCoord;

void main() {

    v_color = vec4(1, 1, 1, 1);

    v_texCoords = a_texCoord0;

    gl_Position = uProject * a_position;
}