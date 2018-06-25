var p1display = document.querySelector("#p1display");
var p2display = document.querySelector("#p2display");
gameOver = false;
p1score = 0;
p2score = 0;
var finalScore = 0;

// console.log(finalScore);

p1Button = document.querySelector("#p1Button");
p2Button = document.querySelector("#p2Button");
reset = document.querySelector("#reset");

p1Button.addEventListener("click", function () {
	if (!gameOver) {
		p1score++;	
		if (p1score === finalScore){
			gameOver = true;
			p1display.classList.add("winner");
		}
	}
	p1display.textContent = p1score;
});

p2Button.addEventListener("click", function () {
	if (!gameOver) {
		p2score++;		
		if (p2score === finalScore){
			gameOver = true;
			p2display.classList.add("winner");	
		}
	}
	p2display.textContent = p2score;
});

function fReset(){
	gameOver = false;
	p1score = 0;
	p2score = 0;
	p1display.textContent = p1score;
	p2display.textContent = p2score;
	p2display.classList.remove("winner");	
	p1display.classList.remove("winner");	
}


document.querySelector("input").addEventListener("change", function(){
	finalScore = Number(this.value);
	// console.log(typeof(finalScore));
	document.querySelector("#finalScoreDisplay").textContent = finalScore;
	fReset();
});

reset.addEventListener("click", fReset);

// p1display.textContent = p1score;
// p2display.textContent = p2score;
