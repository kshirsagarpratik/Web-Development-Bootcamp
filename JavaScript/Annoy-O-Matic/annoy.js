//Ask if we are there yet.
var reply = prompt("Are we there yet?!");
//Check if reply is Yes or Yeah.
while(reply.toLowerCase() !== "yes" && reply.toLowerCase() !== "yeah") {
	alert("No, not yet! Chill!");
	reply = prompt("Are we there yet?!");
}
alert("We have arrived!");


//VERSION 2 - any form of yes ...

// var reply = prompt("Are we there yet?!");
// //Check if reply is Yes or Yeah.
// while (reply.indexOf("yes") === -1) {
// 	alert("No, not yet! Chill!");
// 	reply = prompt("Are we there yet?!");
// }
// alert("We have arrived!");