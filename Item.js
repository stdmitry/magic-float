/**
 * Created by dmitry on 3/6/15.
 */
var Item = function (x,y) {
	this.x = x;
	this.y = y;


	this.canvasObj = new fabric.Rect({
		left: x,
		top: y,
		fill: 'blue',
		width: 50,
		height: 50,
		selectable: false
	});
};

Item.prototype.setCoords = function(x, y) {
	this.canvasObj.set('left', x);
	this.canvasObj.set('top', y);
};

Item.prototype.draw = function (canvas) {
	canvas.add(this.canvasObj);
};