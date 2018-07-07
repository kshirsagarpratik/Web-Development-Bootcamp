function average(array) {
    var sum = 0;
    array.forEach(function(element){
        sum += element;
    });
    return Math.round(sum/array.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94];

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

var x = average(scores);
console.log("Average score for environemnt science.");
console.log(x);
console.log("Average score for organic chemistry.");
console.log(average(scores2));