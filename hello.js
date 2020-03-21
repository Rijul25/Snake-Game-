
//canvas is used to draw graphics




function init(){
	console.log("In Init");
	canvas  = document.getElementById("mycanvas");
	W = canvas.width = 500;
	H = canvas.height = 500;
	pen = canvas.getContext('2d')
	game_over = false;	

	rect = {
	x:20,
	y:20,
	w:40,
	h:40,
	speed:10,
}
//vo tune isme size de rkha hai islie
//size kaha 

}

function draw(){
	//console.log("You are in draw");
	pen.clearRect(0,0,W,H);


	pen.fillRect(rect.x,rect.y,rect.w,rect.h);
	pen.fillStyle = "red";

}

function update(){
	//console.log("You are in update");
	rect.x+= rect.speed;
	if(rect.x>W-rect.w || rect.x<0){
		rect.speed *= -1;
	}

}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
	}
	console.log("In game loop");
	draw();
	update();
}

init();
var f = setInterval(gameloop,100);
