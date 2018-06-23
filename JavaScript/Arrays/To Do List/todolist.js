var toDoList = []; //global array

function printList(){ // print all elements of array.
	console.clear();
	console.log(">>>>>");
	toDoList.forEach(function(todo, index){
		console.log(index + " : " + todo);
	});
	console.log("<<<<<");
}

function deleteFromList(){ // delete particular element from array with feedback/
	var index = prompt("Which element index would you like to delete?");
	toDoList.splice(index,1);
	console.log(">>>>>").
	toDoList.forEach(function(todo, index){
		console.log(index + " : " + todo);
	});
	console.log("<<<<<");
	console.log("Ok, element " + index + " was deleted from To Do List!");
	alert("Ok, element " + index + " was deleted from To Do List!");
}

window.setTimeout(function(){ // Take input and perform actions.
	var choice = prompt("What would you like to do?");
	while(choice !== "quit"){
		if (choice === "new") {
			var choice = prompt("What new to do would you like to add?");
			toDoList.push(choice);
		}
		
		if (choice === "list") {
			printList();
		}
		if (choice === "delete") {
			deleteFromList();
		}
		var choice = prompt("What would you like to do?");
	}
	console.log("OK, YOU QUIT THE APP!");
	alert("OK, YOU QUIT THE APP!");


}, 500)