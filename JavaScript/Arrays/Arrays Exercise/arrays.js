//print reverse of array
function printReverse(array){
	for(var i = array.length-1; i >= 0; i--) {
		console.log(array[i]);
	}
}

printReverse([1,2,3,4]);


//find out if an array is uniform, ie all elements are identical.
function isUniform(array) {
	var firstElement = array[0];
	var truth = true;
	console.log(firstElement);
	array.forEach(function(element){
		if(element !== firstElement){
			truth = false;
		}
	});
	return truth;
}

console.log(isUniform([1,1,1,1,1]));
console.log(isUniform([1,2,3,4,5]));
console.log(isUniform([3,5,6,8]));
console.log(isUniform([3,3,3,3]));


//sum of elements in array.
function sumArray(array) {
	var sum = 0;
	array.forEach(function(ele){
		sum += ele;
	});
	return sum;
}

console.log(sumArray([1,1,1]));
console.log(sumArray([1,2,3]));

//maximum number in an array
function maxAarray(array) {
	var max = array[0];
	array.forEach(function(ele){
		if (ele > max) {
			max = ele;
		}
	});
	return max;
}

console.log(maxAarray([1,2,3,4]));
console.log(maxAarray([4,7,99,23,107]));

