// import particleImage from '../util/images/particle_no_border.png'
import * as constants from '../util/scaling_consts';

class Render {
    constructor(context, canvasWidth, canvasHeight){
     this.context = context;
     this.canvasWidth = canvasWidth;
     this.canvasHeight = canvasHeight;
    }

    draw(){

    }

    _drawCapsule(capsule){
            let startPoint = capsule.pA;
            let endPoint = capsule.pB;
            let lineSegmentLength = endPoint.dist(startPoint) ; 
            
            debugger
            //for now just draw the frame, will later update for allowing users to draw capsules
            //top
            this.context.beginPath();
            this.context.fillStyle = 'rgb(255,255,51)';
            this.context.arc(endPoint['x'], endPoint['y'] - capsule.radius, capsule.radius, 1.5 * Math.PI, 0.5 * Math.PI);
            this.context.fillRect(startPoint['x'], startPoint['y'] - capsule.radius, lineSegmentLength , 30);
            this.context.arc(startPoint['x'], startPoint['y'] - capsule.radius, capsule.radius, 0.5 * Math.PI, 1.5 * Math.PI);
            this.context.fill();
            this.context.closePath();

            
    }

    _drawParticle(){

    }

}

export default Render;