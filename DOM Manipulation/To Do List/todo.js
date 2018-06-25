// pick out the list elements
var lis = document.querySelectorAll("li");

// apply events(hover and click) on them using for loop.
for(i=0; i < lis.length; i++) {
	lis[i].addEventListener("mouseover", function(){
		this.classList.add("highlight");	
	});
	lis[i].addEventListener("mouseout", function(){
		this.classList.remove("highlight");
	});
	lis[i].addEventListener("click", function(){
	this.classList.add("strikeout");
	});
	lis[i].addEventListener("dblclick", function(){
	this.classList.remove("strikeout");
	});
}