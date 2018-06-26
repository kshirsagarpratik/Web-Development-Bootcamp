var colors = [];
var gameMode = "";
var pickedColor = "";
var message = document.body.querySelector("#message");
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var resetButton = document.querySelector("#reset");
var mode = document.querySelectorAll(".mode");
var colorDisplay = document.querySelector("#pickedColor");

init();

function init(){
	gameMode = "hard";
	resetGame(6);
}


resetButton.addEventListener("click", function(){
	gameMode === "easy" ? resetGame(3) : resetGame(6);
});

for(i = 0; i < mode.length; i++ ){	
	mode[i].addEventListener("click", function(){
		mode[0].classList.remove("selected");
		mode[1].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			gameMode = "easy";
			resetGame(3);
			for(i = 3; i < 6; i++){
				squares[i].style.display = "none";
			}
		}
		else
		{
			gameMode = "hard";
			resetGame(6);
			for(i = 3; i < 6; i++){
				squares[i].style.display = "block";
			}
		}
	});
}

function colorPicker(num){
	var randomColor = Math.floor(Math.random() * num);
	return colors[randomColor];
}

function changeColor(color){
	for(i=0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function generateRandomColors(num) {
	var arr = [];
	for(i = 0; i < num; i++) {
		arr.push(randomColorGen());
	}
	return arr;
}

function randomColorGen() {
	// "rgb(255, 0, 0)"
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var colorString = "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")";
	return colorString;  
}

function resetColors(){
	for(i=0; i < colors.length; i++) {
	//add initiall colors
	squares[i].style.backgroundColor = colors[i];
	//add click listeners.
	squares[i].addEventListener("click", function(){
		if (this.style.backgroundColor === pickedColor) {
			changeColor(pickedColor);
			message.textContent = "Correct!";
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again"
		}
		else{
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again!";
		}
	})
	
	}
}

function resetGame(num){
	message.textContent = "";
	colors = generateRandomColors(6);
	pickedColor = colorPicker(num);
	resetColors();
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	colorDisplay.textContent = pickedColor;
}