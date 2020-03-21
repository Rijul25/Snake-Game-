function init(){
	var canvas = document.getElementById("mycanvas");
	W = H =canvas.width = canvas.height = 700;
	pen = canvas.getContext('2d');
	cs=42;
	game_over = false;
	score =5;

	//Create an image object for food 
	food_img = new Image();
	food_img.src = "file:///Users/rijulsingh/Downloads/gameimage.jpg"

	trophy  = new Image();
	trophy.src="file:///Users/rijulsingh/Downloads/trophy.png"


	food = getRandomFood();
	//We need pen to draw something on the canvas

	snake={
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake:function(){
			for(var i=0; i<this.cells.length;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},

		updateSnake:function(){
			//console.log("Updating Snake");
			var HeadX= this.cells[0].x;
			var HeadY = this.cells[0].y;
			//check if the snake has eaten the food object
			//if yes then update the length of snake.

			if(HeadX==food.x && HeadY==food.y){
				console.log("Food eaten ")
				food = getRandomFood();
				score++;
			}
			else{

				this.cells.pop();

			}



			var nextX,nextY;

			if(this.direction=='right'){
				nextX = HeadX + 1;
				nextY = HeadY;

			}
			if(this.direction=='left'){
				nextX = HeadX - 1;
				nextY = HeadY;
			}
			else if (this.direction=='right'){
				nextX = HeadX+1;
				nextY = HeadY;
			}
			else if (this.direction=='down'){
				nextX = HeadX;
				nextY = HeadY +1;
			}
			else{
				nextX = HeadX;
				nextY = HeadY -1;
			}

			this.cells.unshift({x:nextX,y:nextY});

			//Write a code so that the snake does not go outside the loop

			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x > last_x || this.cells[0].y > last_y){

				game_over = true;
			}
		}


	};

	snake.createSnake();

	//Add a event listener on the document object . 
	function keypressed(e){
		//console.log('Key pressed',e.key);
		//Use conditional statements 
		if(e.key=='ArrowRight'){
			snake.direction='right';

		}
		else if (e.key=='ArrowLeft'){
			snake.direction='left';
		}

		else if(e.key=='ArrowDown'){
			snake.direction='down';
		}
		else{
			snake.direction='up';
		}
		console.log(snake.direction);
	}

	document.addEventListener('keydown',keypressed);

}


function draw(){

	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	//We need to clear the old snake

	pen.fillStyle = food.color;

	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = 'blue';

	pen.font = "20px Roboto";
	
	pen.fillText(score,50,50);



}


function update(){
	snake.updateSnake();


}

function getRandomFood(){
	var FoodX = Math.round(Math.random()*(W-cs)/cs);
	var FoodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:FoodX,
		y:FoodY,
		color:'red',
	}
	return food;
}


function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game over");
	}
	draw();
	update();


}


init();
var f = setInterval(gameloop,100);