// isEven number.
//input number from user.
var num = prompt("What is the desired number?");
//function: return true if even or false otherwise.
function isEven(num){
	if (num % 2 === 0) {
		return "True";
	}
	return "False";
}

var truth = isEven(num);

alert("The number is even : " + truth);
console.log("The number is even : " + truth);


//factorial of a number;
var num = prompt("Enter desired number");
//function to return factorial
function factorial(number) {
	if (number === 0 || number === 1) {
		return 1;
	}
	else {
		return factorial(number - 1) * number;
	}
}

alert("The factorial of given number is : " + factorial(num));
console.log("The factorial of given number is : " + factorial(num));


//kebab to snake
var string = prompt("Please enter kebab-case string");
//function to replace every '-' with '_'
function kebabToSnake(string) {
	var newString = string.replace(/-/g, "_");
	return newString;
}

alert("The kebab to snake version is : " + kebabToSnake(string));
console.log("The kebab to snake version is : " + kebabToSnake(string));


