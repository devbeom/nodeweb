var console;
var balls = [];
var ballNumber = 10;
var tempRad = 5;
var tempAngle;
var tempX;
var tempY;
var ballSpeed = 10;
var ball;
var ballType;
var canvasX = 600;
var canvasY = 600;
var theCanvas;
var context;
var shipX = 300; 
var shipY = 300; 
var shipMoveVal = 10;
var tt = 0;

window.onload = function () {
	console = document.getElementById('log');
	console.innerHTML = 'Click Start!!!';
	theCanvas = document.getElementById('c');
	context = theCanvas.getContext('2d');
	Ready();
}



function Ready() {
	context.strokeStyle = "black";
    context.fillStyle = "red";
    context.strokeRect(1, 1, canvasX-2, canvasY-2);
    makeShip();
}

function Start() {
   	window.addEventListener('keydown', whatKey, true);
	//canvasApp();
	var si = setInterval(drawScreen, 100);
}


//Ball 객체 관련
function drawBall() {
    this.cx += this.distX;
    this.cy += this.distY;
    context.strokeStyle = "black";
	if(this.idx == 0)
		context.fillStyle = "green";
	else
		context.fillStyle = "red";
    context.strokeRect(1, 1, canvasX-2, canvasY-2);
    context.beginPath();
    context.arc(this.cx, this.cy, this.rad, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    
    if ((this.cx - (this.rad - this.rad*2) < 0) || (this.cx + (this.rad - this.rad*2) > canvasX)) {
      	ResetBall(this);
  	} else if ((this.cy - (this.rad - this.rad*2) < 0) || (this.cy + (this.rad - this.rad*2) > canvasY)) {
        ResetBall(this);
    }
}

function updateBall() {
    this.distX = Math.cos(this.anglerad) * ballSpeed;
    this.distY = Math.sin(this.anglerad) * ballSpeed;
}

function Ball(sx, sy, trad, angle) {
    this.cx = sx;
    this.cy = sy;
    this.distX;
    this.distY;
    this.rad = trad;
    this.anglerad = angle * (Math.PI / 180);
    this.draw = drawBall;
    this.update = updateBall;
	this.idx = balls.length;
}

function drawScreen() {

    context.clearRect(0, 0, canvasX, canvasY);
    
    if(balls.length < ballNumber)
    {
    	makeBall();
    	//console.innerHTML = 'Ball Count : ' + balls.length;
    }
    
    makeShip();
    
    for(var i = 0; i < balls.length; i++){
        balls[i].draw();
    }

    collideTest();
}

function makeBall() {
	
	ballType = Math.floor(Math.random() * 4);
    
    if(ballType == 0) {
    	tempX = 0;
    	tempY = Math.floor(Math.random() * (canvasY - tempRad)) + tempRad;
    	
    	var t = Math.floor(Math.random() * 180) + 1;
    	if(t > 90) {
    		t = (t - 90) * -1;
    	}
    	tempAngle = t;
    	
    } else if(ballType == 1) {
    	tempX = Math.floor(Math.random() * (canvasX - tempRad)) + tempRad;
    	tempY = 0;	
    	tempAngle = Math.floor(Math.random() * 180) + 1;
    } else if(ballType == 2) {
    	tempX = canvasX;
    	tempY = Math.floor(Math.random() * (canvasY - tempRad)) + tempRad;
    	tempAngle = Math.floor(Math.random() * 180) + 91;
    } else {
    	tempX = Math.floor(Math.random() * (canvasX - tempRad)) + tempRad;
    	tempY = canvasY;
    	tempAngle = (Math.floor(Math.random() * 180) + 1) * -1;
    }
    
    ball = new Ball(tempX, tempY, tempRad, tempAngle);
    ball.update();
    balls.push(ball);
    
}

function ResetBall(ball) {

	ballType = Math.floor(Math.random() * 4);
    
    if(ballType == 0) {
    	tempX = 0;
    	tempY = Math.floor(Math.random() * (canvasY - tempRad)) + tempRad;
    	
    	var t = Math.floor(Math.random() * 180) + 1;
    	if(t > 90) {
    		t = (t - 90) * -1;
    	}
    	tempAngle = t;
    	
    } else if(ballType == 1) {
    	tempX = Math.floor(Math.random() * (canvasX - tempRad)) + tempRad;
    	tempY = 0;	
    	tempAngle = Math.floor(Math.random() * 180) + 1;
    } else if(ballType == 2) {
    	tempX = canvasX;
    	tempY = Math.floor(Math.random() * (canvasY - tempRad)) + tempRad;
    	tempAngle = Math.floor(Math.random() * 180) + 91;
    } else {
    	tempX = Math.floor(Math.random() * (canvasX - tempRad)) + tempRad;
    	tempY = canvasY;
    	tempAngle = (Math.floor(Math.random() * 180) + 1) * -1;
    }
    
	ball.cx = tempX;
	ball.cy = tempY;
	ball.anglerad = tempAngle * (Math.PI / 180);
	ball.update();
}

function makeShip(){
	context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(shipX, shipY, 5, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}


function whatKey(evt) {

    var flag = 0;

    switch (evt.keyCode) {

    // Left arrow.
    //console.innerHTML = evt.keyCode;
    //return false;
    
		case 37:
		  shipX = shipX - shipMoveVal;
		  if (shipX < 0) {
			// If at edge, reset ship position and set flag.
			shipX = 0;
			flag = 1;
		  }
		  break;

		  // Right arrow.
		case 39:
		  shipX = shipX + shipMoveVal;
		  if (shipX > canvasX) {
			// If at edge, reset ship position and set flag.
			shipX = canvasX;
			flag = 1;
		  }
		  break;

		  // Down arrow
		case 40:
		  shipY = shipY + shipMoveVal;
		  if (shipY > canvasY) {
			// If at edge, reset ship position and set flag.
			shipY = canvasY;
			flag = 1;
		  }
		  break;

		  // Up arrow
		case 38:
		  shipY = shipY - shipMoveVal;
		  if (shipY < 0) {
			// If at edge, reset ship position and set flag.
			shipY = 0;
			flag = 1;
		  }
		  break;

		default:
		  //flag = 1;
		  //alert("Please only use the arrow keys.");
    }
   
}


function collideTest() {

	var sx = shipX;
	var sy = shipY;
	var tx = balls[0].cx;
	var ty = balls[0].cy;

	if((sx - tx) * -1 < sx) {
		console.innerHTML = 'Hit';
	}

	//console.innerHTML = 'tx :' + tx + ' sx : ' + sx;


}
