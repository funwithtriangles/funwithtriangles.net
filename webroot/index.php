<html>
<head>
<style>
body, html {
    height: 100%;
    margin: 0;
    margin: 0;
    background-color: rgb(235,235,235);
}
</style>
</head>
<canvas>
</canvas>

<script>

var canvas, context, width, height, cx, cy;
var ONE_THIRD = 1/3;
var TWO_THIRD = 2/3;
var TWO_PI = 2*Math.PI;
var triAngles = [
    0,
    ONE_THIRD*TWO_PI,
    TWO_THIRD*TWO_PI
]
var globalAngle = 0;

var colors = [[241,118,76], [232,88,59]];

canvas = document.querySelector('canvas');
context = canvas.getContext('2d');
width = canvas.width = window.innerWidth;
height = canvas.height = 200;
cx = width/2;
cy = height/2;

var triWidth = 40;
var triHeight = triWidth * (Math.sqrt(3)/2);
var triCols = Math.ceil(width/triWidth);
var triRows = Math.ceil(height/triWidth);
var triCount;

if (triCols > triRows) {
    triCount = triCols*1.5; 
} else {
    triCount = triRows*1.5;
   
}
 var gridSize = triCount * triWidth;
var moveX = 0;
var moveY = 0;
var message = "FUN WITH TRIANGLES";



context.translate(width/2, height/2);



function triangle(r, color, angle, x, y) {

    var angleX, angleY;

    angle = angle + ONE_THIRD*Math.PI/2;

    
    context.beginPath();
    context.fillStyle = 'rgba('+color[0]+','+color[1]+','+color[2]+','+1+')';
     
    for (var i=0; i < triAngles.length; i++) {

        angleX = r*Math.cos(triAngles[i] + angle) + x;
        angleY = r*Math.sin(triAngles[i] + angle) + y;

        if (i == 0) {
           context.moveTo(angleX,angleY); 
        } else {
            context.lineTo(angleX,angleY); 
        } 

    }

    context.fill();
    context.closePath();

}


document.addEventListener('mousemove', handleMouseMove, false);

function handleMouseMove(e) {

    moveX = e.clientX;
    moveY = e.clientY;
}

function draw() {

    context.globalCompositeOperation = 'normal';
    var color = colors[0];
    context.fillStyle = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
    context.rect(-gridSize/2,-gridSize/2,gridSize,gridSize);
    context.fill();


    context.save();


   
    
    

    for (var j = 0; j < triCount; j++) {

        var bool = j % 2;
        var xOffset = triWidth - (2*triWidth*bool);
        var posX = (moveX - (2*moveX*bool))/50;
        context.translate(xOffset,triHeight);

        if (bool) {
            context.globalCompositeOperation = 'difference';
        } else {
            context.globalCompositeOperation = 'screen';
        }

        for (var i = 0; i < triCount; i++ ) {

            var bool = i % 2;

            var posY = (moveY - (2*moveY*bool))/40  - (gridSize/2);

            triangle(triWidth, colors[bool], (Math.PI*bool)+globalAngle, (i*triWidth)+posX - (gridSize/2), posY);

        }
    }   

    globalAngle+=0.002;
    var fontSize = 200;



    context.globalCompositeOperation = 'destination-in';
    context.font = '800 '+fontSize+'px "Brandon Grotesque"';
    context.textAlign = "center";

    while (context.measureText(message).width > width) {
        fontSize--;
        context.font = '800 '+fontSize+'px "Brandon Grotesque"';
    }

    context.setTransform(1,0,0,1,0,0);
    context.fillStyle = "rgb(0,0,0)";
    context.fillText(message, cx, cy+fontSize/4);

   context.restore();
    context.rotate(0.0003);
   
   requestAnimationFrame( draw );

    

}

requestAnimationFrame( draw );





</script>

</html>