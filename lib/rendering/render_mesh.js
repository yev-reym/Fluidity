import createBuffer from 'gl-buffer';


//let's make a function which will translate the cartesian coordinates for position used in our code to pixel coordinates
//cartesian sets grid origin in the center, while the screen has the origin in the top-left corner of the screen
//the basic formula is to multiply the x coordinate by a zoom factor, and then add that to half of the screen width
export function cartToPixel(position, canvasWidth, canvasHeight) {
    // const x = ((position[0] / 2.0) * canvasHeight) + canvasWidth / 2.0
    // const y = (canvasWidth / 2.0) - canvasHeight * position[1]
    var x = ((position[0] + 1) / 2.0) * canvasWidth;
    var y = (((position[1] + 1) / 2.0) * canvasHeight);
    return [x,y]
}

export class SimMesh {
    constructor(glContext, canvasWidth, canvasHeight){
        //create new buffers for our simulation geometry data. we make one for the position, color, texture, and an index buffer, which is basically
        // an array of pointers into the vertex buffer, and allows us to reorder vertex data, and reuse existing data for multiple vertices.
        //we first pass the canvas context, then the data type, and by defaaul the last two optional arguments are gl.ARRAY_BUFFER which specifies the type, except
        //for the index buffer which has a different type, and the last field is usage, which id defaulted to gl.DYNAMIC_DRAW for all four. 
        this.glContext = glContext;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.positionBufferObject = createBuffer(this.glContext,[]);
        this.colorBufferObject = createBuffer(this.glContext, []);
        this.textureBufferObject = createBuffer(this.glContext, []);
        this.indexBufferObject = createBuffer(this.glContext, [], this.glContext.ELEMENT_ARRAY_BUFFER);
    }

    setupBufferRender(){
        //initialize arrays we will keep our elements in and the indices we will refer to specific elements 
        this.indexBuffer = [];
        this.colorBuffer = [];
        this.textureBuffer = [];
        this.positionBuffer = [];
        
        this.indexIndex = 0;
        this.positionIndex = 0;
        this.textureIndex = 0;
        this.colorIndex = 0;
    }

    draw(){
        //function to draw based on data in the buffers
        //we want to make our mesh out of multiple triangles, and we tell it to render to amount of vertices at our current indexIndex
        this.glContext.drawElements(this.glContext.Triangles, this.indexIndex, this.glContext.UNSIGNED_SHORT, 0);
    }

    bufferUpdate(shader){
        //pass info to our shaders so they can rasterize the new information and our simulation will get updated
        //After this we will follow a similar pattern for all coords, which is to enable vertex attributes.
        //since attributes cannot be used unless enabled, and are disabled by default, you need to call enableVertexAttribArray() 
        //to enable individual attributes so that they can be used in the vertex shader
        this.positionBufferObject.update(this.positionBuffer);
        this.glContext.enableVertexAttribArray(this.glContext.getAttribLocation(shader,'aPosition'));
        this.glContext.vertexAttribPointer(this.glContext.getAttribLocation(shader, 'aPosition'), 2, this.glContext.FLOAT, false, 0, 0);
        this.positionBufferObject.unbind();

        this.colorBufferObject.update(this.colorBuffer);
        this.glContext.enableVertexAttribArray(this.glContext.getAttribLocation(shader, 'acolor'));
        this.glContext.vertexAttribPointer(this.glContext.getAttribLocation(shader, 'acolor'), 2, this.glContext.FLOAT, false, 0, 0);
        this.colorBufferObject.unbind();

        this.textureBufferObject.update(this.textureBuffer);
        this.glContext.enableVertexAttribArray(this.glContext.getAttribLocation(shader, 'atexture'));
        this.glContext.vertexAttribPointer(this.glContext.getAttribLocation(shader, 'atexture'), 2, this.glContext.FLOAT, false, 0, 0);
        this.textureBufferObject.unbind();

        this.indexBufferObject.update(this.indexBuffer);
    }

    _addIndex(newIndex){
        //this helper method will update the index buffer containing indices with a new index. We increment the index bufferIndex, key into that in the index buffer, and set that 
        //position in the array to the new index
        this.indexBuffer[this.indexIndex++] = newIndex
    }

    _addPosition(position){
        //this will update our position buffer. We take in a cartesian position so first we must convert it to pixel coordinates
        const pixelCoord = cartToPixel(position, this.canvasWidth, this.canvasHeight);

        //now we incremenet the position buffer by keying in to the incremented index and adding the new position components
        this.positionBuffer[this.positionIndex++] = pixelCoord[0];
        this.positionBuffer[this.positionIndex++] = pixelCoord[1];
    }

    _addColor(color){
        color.forEach((colorComponent) => {
            this.colorBuffer[this.colorIndex++] = colorComponent
        });
    }

    _addTexture(texture){
        texture.forEach((textureComponent) => {
            this.textureBuffer[this.textureIndex++] = textureComponent
        });
    }

    _texturedVertex(position, color, texture){
        this._addIndex(position);
        this._addColor(color);
        this._addTexture(texture);
    }

    _coloredVertex(position, color){
        this._addPosition(position);
        this._addColor(color);
    }
}

