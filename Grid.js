/**
 * Created by dmitry on 3/6/15.
 */
var GridHelper = new function () {
	this.size = 50;
	//this.init = function(size) { this.size = size; };
	this.round = function (number) {return Math.round(number/this.size) * this.size;};
};

var GridDrawer = function (c) {
	//this.c = c;
	//this.init = function (c) {this.c = c;}
	this.draw = function() {
		var viewport = c.viewport;
		var zoom = viewport.zoom;
		var context = c.getContext("2d");

		var clientRect = new Rectangle(-viewport.translate().x,  -viewport.translate().y, c.getWidth() / zoom, c.getHeight() / zoom);
		c.beginDraw(context);
		for (var x = GridHelper.round(clientRect.left); x < clientRect.right; x += GridHelper.size) {
			context.moveTo(x, clientRect.top);
			context.lineTo(x, clientRect.bottom);
		}

		for (var y = GridHelper.round(clientRect.top); y < clientRect.bottom; y += GridHelper.size) {
			context.moveTo(clientRect.left, y);
			context.lineTo(clientRect.right, y);
		}

		context.strokeStyle = "#ddd";
		context.stroke();
		c.endDraw(context);
	}
};