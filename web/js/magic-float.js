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






$(function() {
	$(document).on('mousewheel', function(event) {
		c.setZoom(c.getZoom()*(1 - 0.05*event.deltaY));
	});


});