//all numbers between -10 and 19.
for(var i = -10; i < 20; i++){
	console.log(i);
}

//all even numbers between 10 and 40.
for(var i = 10; i <= 40; i += 2){
	console.log(i);
}

//all odd numbers between 300 and 333.
for(var i = 301; i <= 333; i += 2){
	console.log(i);
}

//all numbers between 5 and 50 that are divisible by both 5 and 3.
for(var i = 5; i <= 50; i++){
	if (i % 5 === 0 && i % 3 === 0) {
		console.log(i);
	}
}