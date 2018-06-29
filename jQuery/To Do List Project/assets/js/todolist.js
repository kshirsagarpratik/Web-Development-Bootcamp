//check off specific todos by clicking.
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

// click on X to delete todo.
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

// add to dos
// type in input box and press enter to add into list.
$("input[type='text']").on("keypress", function(event){
	if (event.which === 13) {
		var inputText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> " + inputText + "</li>");
	}
})

//toggle input upon pressing plus sign.
$("#plus").on("click", function(){
	$("input[type='text']").fadeToggle();
})