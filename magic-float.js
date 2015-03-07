/**
 * Created by dmitry on 2/24/15.
 */
c.selection = false;
var objectsCollection = [];
var objAssistant = new ObjAssistant(c);
var storage



function onload() {

	c.on('mouse:move', function (e) {
		objAssistant.onMouseMove(e);
	});


	c.on('mouse:up', function(e) {
		var i = 0;
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


function ObjAssistant(c)  {
	var currentObject = null;
	var lastX = null;
	var lastY = null;

	this.onMouseMove = function (e) {
		if (!currentObject)
			currentObject = createCurrentObject(123);

		var x = gridHelper.round(e.e.clientX-25);
		var y = gridHelper.round(e.e.clientY-25);

		if (x != lastX || y != lastY) {
			currentObject.set('left',gridHelper.round(e.e.clientX-25));
			currentObject.set('top', gridHelper.round(e.e.clientY-25));
			currentObject.setCoords();
			c.renderAll();
		}
    };

	function createCurrentObject(type) {
		var obj = new fabric.Rect({
			id: 'shadowObj',
			left: 0,
			top: 0,
			fill: 'green',
			opacity: 0.5,
			width: 50,
			height: 50,
			selectable:false
		});
		c.add(obj);
		return obj;
	}
}



function Rectangle(x, y, width, height) {
	this.left = x;
	this.right = x + width;;
	this.top = y;
	this.bottom = y + height;
}


$(function() {
	$(document).on('mousewheel', function(event) {
		c.setZoom(c.getZoom()*(1 - 0.05*event.deltaY));
	});

	$(document).on('keydown', function(event) {
		if (event.keyCode == 32) {
			c.isGrabMode = true;
			$(document.body).css( 'cursor', 'move' ); // todo: не работает
		}
	});

	$(document).on('keyup', function(event) {
		if (event.keyCode == 32) {
			c.isGrabMode = false;
			$(document.body).css( 'cursor', 'crosshair' );
		}
	});
});