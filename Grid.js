/**
 * Created by dmitry on 3/6/15.
 */
var GridHelper  = {size:50} ;
GridHelper.round = function (number) {return Math.round(number/this.size) * this.size;};
GridHelper.floor = function (number) {return Math.floor(number/this.size) * this.size;};

GridHelper.getPos = function (coords) {
	return {
		x:this.floor(coords.x) / this.size,
		y:this.floor(coords.y) / this.size,
		z:coords.z
	};
};

GridHelper.getCoords = function (pos) {
	return {
		x:pos.x * this.size,
		y: pos.y * this.size,
		z: pos.z
	} ;
};

GridHelper.get3DCoords = function (pos) {
	var coords = this.getCoords(pos);
	var kx = 0.7;
	var ky = 0.345;
	return {
		x: 50 + coords.x * kx + coords.y * kx,
		y: 50 - coords.x * ky + coords.y * ky + coords.z * this.size,
		z: -coords.x * ky + coords.y * ky + coords.z * (this.size + 500)
	} ;
};


var GridDrawer = function (canvas) {
	this.init = function () {
		//App.events['renderBackground'].subscribe(this.draw);
	};

	this.draw = function() {
		var viewport = canvas.viewport;
		var zoom = viewport.zoom;
		var context = canvas.getContext("2d");

		var clientRect = new Rectangle(-viewport.translate().x,  -viewport.translate().y, canvas.getWidth() / zoom, canvas.getHeight() / zoom);
		canvas.beginDraw(context);
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
		canvas.endDraw(context);
	}
};