var moviesDB = [
	{
		name: "The Incredibles",
		rating: "9.1",
		hasWatched: "Yes"
	},

	{
		name: "Black Panther",
		rating: "8.6",
		hasWatched: "Yes"
	},

	{
		name: "Hereditary",
		rating: "7.9",
		hasWatched: "No"
	}
]


function print(object){
	watched = "You have not watched ";
	if (object.hasWatched === "Yes") {
		watched = "You have watched ";
	}
	console.log(watched + "\"" + object.name + "\"" + " : " + object.rating + " stars");
}

moviesDB.forEach(function(movie){
	print(movie);
});