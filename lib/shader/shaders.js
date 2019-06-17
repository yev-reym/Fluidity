
export const vert = 

//define default medium precision for all floating-point variables
precision mediump float;

//position of vertex in our xyz coordinate space being passed to vertex shader function
attribute vec2 aPosition;
//a texture coordinate 
attribute vec2 aTexture;
//that same texture coordinate will be passed to the fragment shader to have texture applied to
varying vec2 vTexture;
//our 4 x 4 matrix to tranform vectors in our xyz space to uvw  Projection space (clipspace in our GPU's texture unit)
uniform mat4 uProject;
//get a color 
attribute vec4 aColor
//pass color information to fragment shader
varying vec4 vColor;


void main() {
    //vertex color that will be passed to fragment to fill in pixels is the color attribute we initialized
    vColor = aColor;
    
    //pass texture image to fill vertices in fragment shader
    vTexture = aTexture;

    // transform new vector consisting of rank-2 position vector, no z-coordinate, set w scaling coordinate to 1.0 by convention, into the projection space using projection transformation matrix
    gl_Position = uProject * vect4(aPosition, 0.0, 1.0);
}

export const frag = 

//define default medium precision for all floating-point variables
 precision mediump float;

 //the color we passed from our vertex shader
varying vec4 vColor;

//the texture coord we passed from the vertex shader 
varying vec2 vTexture;

//a non-changing texture object that is binded to the texture unit using the sampler2D attribute
uniform sampler2D uImage;

void main() {

    //Apply image texture to texture coordinates
    vec4 newTexture = texture2D(uImage, vTexture);

    gl_FragColor = vec4(vColor.xyz * newTexture.xyz, newTexture.x * vColor.a );

    // //if x-coordinate of vertex is loacated at 2.0 in the clipspace
    // if (vTexture.x == 2.0) {
    //     gl_FragColor = vec4(vertColor.xyz, 1.0);
    // } else {
    //     //here .a references the first component of the texture vector
    //     gl_FragColor = vec4(newTexture.xyz * vColor.xyz, newTexture.a);

    // }
}