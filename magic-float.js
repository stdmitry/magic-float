/**
 * Created by dmitry on 2/24/15.
 */
var c = new fabric.CanvasWithViewport("myCanvas", {isDrawingMode: true});
c.isGrabMode = true;
function onload() {
	/*
	fabric.Image.fromURL('https://nartstudios.files.wordpress.com/2012/04/brick-block1.jpg', function(img) {
		img.scale(0.1).set({
			left: 100,
			top: 100
		});
		canvas.add(img);
	});
	*/
	var rect = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'red',
		width: 20,
		height: 20
	});

// "add" rectangle onto canvas
	c.add(rect);
	var gridDrawer = new GridDrawer(c);
	gridDrawer.draw();

	c.on('after:render', function () {
		gridDrawer.draw();

	});
	/*

	canvas.on('mouse:over', function(e) {
		e.target.setFill('red');
		canvas.renderAll();
	});

	canvas.on('mouse:out', function(e) {
		e.target.setFill('green');
		canvas.renderAll();
	});

	https://nartstudios.files.wordpress.com/2012/04/brick-block1.jpg
	// add random objects
	for (var i = 15; i--; ) {
		var dim = fabric.util.getRandomInt(30, 60);
		var klass = ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0,2)];
		var options = {
			top: fabric.util.getRandomInt(0, 600),
			left: fabric.util.getRandomInt(0, 600),
			fill: 'green'
		};
		if (klass === 'Circle') {
			options.radius = dim;
		}
		else {
			options.width = dim;
			options.height = dim;
		}
		canvas.add(new fabric[klass](options));
	}
	*/
};


function Rectangle(x, y, width, height) {
	this.left = x;
	this.right = x + width;;
	this.top = y;
	this.bottom = y + height;
}


function GridDrawer(c) {
	var gridsize = 50;
	this.draw = function() {

		var viewport = c.viewport;
		var zoom = viewport.zoom;
		var context = c.getContext("2d");

		var clientRect = new Rectangle(viewport.translate().x,  viewport.translate().y, c.getWidth() / zoom, c.getHeight() / zoom);
		console.log(clientRect );
		for (var x = clientRect.left; x < clientRect.right; x += gridsize) {
			context.moveTo(x, clientRect.top);
			context.lineTo(x, clientRect.bottom);
		}

		for (var y = clientRect.top; y < clientRect.bottom; y += gridsize) {
			context.moveTo(clientRect.left, y);
			context.lineTo(clientRect.right, y);
		}

		context.strokeStyle = "#ddd";
		context.stroke();
	}
}