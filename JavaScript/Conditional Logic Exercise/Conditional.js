var age = Number(prompt("Please enter age."));
if(age === 21) {
	console.log("Happy 21st Birthday!");
}

if (age < 0) {
	console.log("Error in input age!");
}

if (age % 2 === 1) {
	console.log("Your age is odd!");
}

if(Math.sqrt(age) % 1 === 0) {
	console.log("Age is perfect square!");
}