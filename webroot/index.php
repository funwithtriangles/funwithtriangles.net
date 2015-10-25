<!doctype html>
<html>
    <head>
        <style>
        body, html {
            height: 100%;
            margin: 0;
            margin: 0;
            background-color: rgb(235,235,235);
        }

        header {
            padding: 1rem;
        }

        </style>
    </head>

<body>
<header data-header>
    <canvas>Fun with Triangles</canvas>
</header>


<script src="/js/jquery.min.js"></script>
<script>

// Constants
var ONE_THIRD = 1/3;
var TWO_THIRD = 2/3;
var TWO_PI = 2*Math.PI;
var triAngles = [
    0,
    ONE_THIRD*TWO_PI,
    TWO_THIRD*TWO_PI
]

// Settings
var colors = [[241,118,76], [232,88,59]];
var triWidth = 40;
var imageSrcLarge = "/images/header_wide.svg";
var imageSrcSmall = "/images/header_tall.svg";

// Canvas vars
$canvas = $('canvas');
$container = $('[data-header]');
context = $canvas[0].getContext('2d');

// Triangle grid
var triHeight = triWidth * (Math.sqrt(3)/2);
var triCols, triRows, triCount, gridSize;
var globalAngle = 0;

// Header Image
var headerImage = new Image();
var imageRatio;
var imageLoaded = false;

// Mouse vars
var moveX = 0;
var moveY = 0;



var resize = function() {

  

    // Canvas sizing stuff
    width = $canvas[0].width = $container.width();
    height = $canvas[0].height = width*imageRatio;
    cx = width/2;
    cy = height/2;

    // Triangle grid
    triCols = Math.ceil(width/triWidth);
    triRows = Math.ceil(height/triWidth);

    if (triCols > triRows) {
        triCount = triCols*1.5; 
    } else {
        triCount = triRows*1.5;       
    }

    gridSize = triCount * triWidth;

    //context.setTransform(1,0,width/2,1,0,height/2);
    context.translate(width/2, height/2);

    checkScreenWidth();

}

var checkScreenWidth = function() {

    if (window.innerWidth < 500 && headerImage.src != imageSrcSmall) {
        headerImage.src = imageSrcSmall
    } else if (headerImage.src != imageSrcLarge) {
        headerImage.src = imageSrcLarge;
    }

   
}

// Generates triangle at any position/rotation/color
var triangle = function(r, color, angle, x, y) {

    var angleX, angleY;


    // Rotation
    angle = angle + ONE_THIRD*Math.PI/2;

    context.beginPath();
    context.fillStyle = 'rgba('+color[0]+','+color[1]+','+color[2]+','+1+')';
    
    // Triangle points calculated using third angles on a circle
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

var handleMouseMove = function(e) {

    moveX = e.clientX;
    moveY = e.clientY;
}

var draw = function() {

    // Don't draw unless image loaded
    if (!imageLoaded) { return };

    // Background color in case holes peep throuhg
    context.globalCompositeOperation = 'normal';
    var color = colors[0];
    context.fillStyle = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
    context.rect(-gridSize/2,-gridSize/2,gridSize,gridSize);
    context.fill();

    // Save context for canvas rotation
    context.save();
    
    // Iterate triangle Rows
    for (var j = 0; j < triCount; j++) {

        // Alternate offset of each row
        var bool = j % 2;
        var xOffset = triWidth - (2*triWidth*bool);
        context.translate(xOffset,triHeight);
        
        // Adjust x position with mouse X, alternate +/- on row
        var posX = (moveX - (2*moveX*bool))/50;
        
        // Alternate the blend mode for each row;
        if (bool) {
            context.globalCompositeOperation = 'difference';
        } else {
            context.globalCompositeOperation = 'screen';
        }

        for (var i = 0; i < triCount; i++ ) {

            // Adjust y position with mouse y, alternate +/- on rcolow
            var bool = i % 2;
            var posY = (moveY - (2*moveY*bool))/40  - (gridSize/2);

            // Draw triangle, alternate up/down rotation while adding the global rotation
            triangle(triWidth, colors[bool], (Math.PI*bool)+globalAngle, (i*triWidth)+posX - (gridSize/2), posY);

        }
    }   

    globalAngle+=0.002;

    // Apply masked text image
    context.globalCompositeOperation = 'destination-in';
    context.setTransform(1,0,0,1,0,0);
    context.drawImage(headerImage,0,0, width, width*imageRatio);
    context.restore();

    // Rotate entire canvas
    context.rotate(0.0003); 

};


headerImage.onload = function() {
    
    imageLoaded = true;
    imageRatio = this.height/this.width;

    resize();

}

checkScreenWidth();
$(window).on('mousemove', handleMouseMove);
$(window).on('resize', resize);

(function animLoop() {
    requestAnimationFrame( animLoop );
    draw();
})();



</script>
</body>
</html>