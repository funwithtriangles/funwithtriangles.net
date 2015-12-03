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
var triWidth = 100;
//var imageSrcLarge = "/images/header_wide.svg";

var friction = 0.9;
var maxV = 100;

// Canvas vars
var elCanvas = document.querySelector('canvas');
var elContainer = document.querySelector('[data-header]');
var context = elCanvas.getContext('2d');

var imageSrcSmall = elContainer.dataset.header;
var imageSrcLarge = imageSrcSmall;


var pixelRatio = window.devicePixelRatio || 1;

// May need to do this for performance reasons
//var pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

// Triangle grid
var triHeight = triWidth * (Math.sqrt(3)/2);
var triCols, triRows, triCount, gridSize;
var globalAngle = 0;

// Header Image
var headerImage = new Image();
var imageRatio;
var imageLoaded = false;
var usingImage;

// Mouse vars
var moveX = 0;
var moveY = 0;
var lastX = 0;
var lastY = 0;
var mouseLastMoved;

var vx = 0;
var vy = 0;

var resize = function() {

    // Canvas sizing stuff
    width = Math.floor(elCanvas.width = elContainer.offsetWidth * pixelRatio);
    height = Math.floor(elCanvas.height = (width/pixelRatio)*imageRatio * pixelRatio);
    cx = width/2;
    cy = height/2;

    context.scale(pixelRatio,pixelRatio);

    elCanvas.style.width = Math.floor(width/pixelRatio)+"px";
    elCanvas.style.height = Math.floor(height/pixelRatio)+"px";

    // Triangle grid
    triCols = Math.ceil(width/triWidth);
    triRows = Math.ceil(height/triWidth);

    if (triCols > triRows) {
        triCount = triCols*1.5; 
    } else {
        triCount = triRows*1.5;       
    }

    gridSize = triCount * triWidth;

    context.translate(Math.floor(width/2), Math.floor(height/2));

    checkScreenWidth();

}

var checkScreenWidth = function() {

    if (Modernizr.mq('(max-width: 600px)') && usingImage != 'small') {

        headerImage.src = imageSrcSmall
        usingImage = 'small';

    } else if (Modernizr.mq('(min-width: 600px)') && usingImage != 'large') {
        headerImage.src = imageSrcLarge;
        usingImage = 'large';
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

    if (!mouseLastMoved) {
        mouseLastMoved = Date.now();
    }

    // if (!mouseMoving) {
    //     moveXStart = e.clientX;
    //     moveYStart = e.clientY;
    //     mouseMoving = true;
    // }

    // If last mouse recorded 10th of a second ago
    if (mouseLastMoved < Date.now() - 50) {
        // Get speed of mouse
        vx = e.clientX - lastX;
        vy = e.clientY - lastY;

        // Update new values of mouse to check next time
        lastX = e.clientX;
        lastY = e.clientY;
        mouseLastMoved = Date.now();

    }

   
    
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

    context.save();

    var color = colors[1];
     context.fillStyle = 'rgba('+color[0]+','+color[1]+','+color[2]+','+1+')';
    
    // Iterate triangle Rows
    for (var j = 0; j < triCount; j++) {

        // Alternate offset of each row
        var bool = j % 2;
        var xOffset = triWidth - (2*triWidth*bool);
        context.translate(xOffset,triHeight);
        
        // Adjust x position with mouse X, alternate +/- on row
        var posX = (moveX - (2*moveX*bool))/10;
        
        // Alternate the blend mode for each row;
        if (bool) {
            context.globalCompositeOperation = 'difference';
        } else {
            context.globalCompositeOperation = 'screen';
        }

        for (var i = 0; i < triCount; i++ ) {

            // Adjust y position with mouse y, alternate +/- on rcolow
            var bool = i % 2;
            var posY = (moveY - (2*moveY*bool))/10  - (gridSize/2);

            // Draw triangle, alternate up/down rotation while adding the global rotation
            triangle(triWidth, colors[bool], (Math.PI*bool)+globalAngle, (i*triWidth)+posX - (gridSize/2), posY);

        }
    }   

    globalAngle+=0.003;

    // Apply masked text image
    context.globalCompositeOperation = 'destination-in';
    context.setTransform(1,0,0,1,0,0);
    context.drawImage(headerImage,0,0, width, width*imageRatio);
    
    context.restore();

   
};


var handlePhysics = function() {

    if (vx > maxV) {
        vx = maxV;
    } else if (vx < -maxV) {
        vx = -maxV;
    }

    if (vy > maxV) {
        vy = maxV;
    } else if (vy < -maxV) {
        vy = -maxV;
    }
 

    vx = vx*friction;
    vy = vy*friction;

    moveX += vx;
    moveY += vy;
}


headerImage.onload = function() {
    
    imageLoaded = true;
    imageRatio = this.height/this.width;

    resize();

}


checkScreenWidth();
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', resize);

window.addEventListener('devicemotion', function(e) {

  ax = e.acceleration.x;
  ay = e.acceleration.y;
  az = e.acceleration.z;

  if (ax > 0.5 || ax < -0.5) {
    vx = ax * 10;
  }

  if (ay > 0.5 || ay < -0.5) {
    vy = ay * 10;
  }

  if (az > 0.5 || az < -0.5) {
    vy = az * 10;
  }
  
});

requestAnimationFrame(function animLoop(){
 handlePhysics();  
 draw();
 requestAnimationFrame( animLoop );
});