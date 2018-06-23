var actualNumber = 6;
var guessNumber = Number(prompt("Guess the number!"));

if (guessNumber === actualNumber) {
	alert("You got it right!");
}

else if (guessNumber < actualNumber) {
	alert("Too low, guess again!");
}

else {
	alert("Too high, guess again!");
}
