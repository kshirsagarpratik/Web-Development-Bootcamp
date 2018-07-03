var keyData = {
		a: {
			color: "orange";
			sound = new Howl({
		  		src: ['sounds/bubbles.mp3']
			})
		},

		s: {
			color: "pink";
			sound = new Howl({
		  		src: ['sounds/clay.mp3']
			})
		}
	}

	/*var sound1 = new Howl({
  		src: ['sounds/bubbles.mp3']
	});*/

	/*var sound2 = new Howl({
  		src: ['sounds/clay.mp3']
	});*/

	arrayCircles = [];
	
	function onKeyDown(event) {
		// When a key is pressed, set the content of the text item:

		var maxPoint = new Point(view.size.width, view.size.height);
		var randomPoint = maxPoint * Point.random()
		coloredCircle = new Path.Circle(randomPoint, 300);
		coloredCircle.fillColor = keyData[event.key].color;
		keyData[event.key].sound.play();
		console.log(view.size);
		arrayCircles.push(coloredCircle);	
	}

	function onFrame(event) {
		for(i=0; i< arrayCircles.length; i++){
			var target = arrayCircles[i];
			target.fillColor.hue += 1;
			target.scale(.9);
		}
	}