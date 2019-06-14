export const vert = 

//define default medium precision for all floating-point variables
precision mediump float;

//position of vertex in our xyz coordinate space being passed to vertex shader function
attribute vec2 aPosition;
//a position coordionate in our uvw projection space, which we will initialize here
attribute vec2 aUV;
//that same positon coordinate in uvw projection space now mapped as a vertex, which will be passed to the fragment shader to have texture applied to
varying vec2 vertUV;
//our 4 x 4 matrix to tranform vectors in our xyz space to uvw  Projection space (clipspace in our GPU's texture unit)
uniform mat4 uProject;
//get a color 
attribute vec4 aColor
//pass color information to fragment shader applied on a vertex
varying vec4 vertColor;


void main() {
    //vertex color is the color attribute we initialized
    vertColor = aColor;
    
    //make a piece of data in our xyz space a vertex
    vertUV = aUV;

    // transform new vector consisting of rank-2 position vector, no z-coordinate, into the projection space using projection transformation matrix
    gl_Position = uProject * vect4(aPosition, 0.0, 1.0);
}

export const frag = 

//define default medium precision for all floating-point variables
 precision mediump float;

 //the colored vertex we passed from our vertex shader
varying vec4 vertColor;

//the uv coordinate we passed from the vertex shader 
varying vec2 vertUV;

//a non-chaning texture object that is binded to the texture unit using the sampler2D attribute
uniform sampler2D uTexture;

void main() {

    vec4 newTexture = texture2D(uTexture, vertUV);
    //gl_FragColor = vec4(vColor.xyz * newTexture.xyz, newTexture.x * vColor.a );

    //if x-coordinate of vertex is loacated at 2.0 in the clipspace
    if (vertUV.x == 2.0) {
        gl_FragColor = vec4(vertColor.xyz, 1.0);
    } else {
        //here .a references the first component of the texture vector
        gl_FragColor = vec4(newTexture.xyz * vertColor.xyz, newTexture.a);

    }
}