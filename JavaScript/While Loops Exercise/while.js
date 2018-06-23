//print all numbers between -10 and 19
var n = -10;
while(n <= 19) {
	console.log("I am at " + n);
	n++;
}

//print all even numbers between 10 and 40
var n = 10;
while(n <= 40) {
	if(n % 2 === 0) {
		console.log("I am an even number, " + n);
	}
	n++;
}

//print all odd numbers between 300 and 333
var n = 300;
while(n <= 333) {
	if(n % 2 !== 0) {
		console.log("I am an odd number, " + n);
	}
	n++;
}

//print all numbers between 5 and 50 divisible by 3 AND 5
var n = 5;
while(n <= 50) {
	if (n % 5 === 0 && n % 3 === 0) {
		console.log("I am divisible by both 3 and 5, " + n);
	}
	n++;
}
