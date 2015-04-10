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
	var kx = .54;
	var ky = 0.44;
	var kz = 0.4;
	return {
		x: 50 + coords.x * kx + coords.y * kx - 100,
		y: 50 - coords.x * ky + coords.y * ky - coords.z * this.size * kz + 400,
		z: -coords.x * ky + coords.y * ky + coords.z * (this.size + 500)
	} ;
};


CanvasRenderingContext2D.prototype.dashedLine = function (x1, y1, x2, y2, dashLen) {
	if (dashLen == undefined) dashLen = 2;
	this.moveTo(x1, y1);

	var dX = x2 - x1;
	var dY = y2 - y1;
	var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
	var dashX = dX / dashes;
	var dashY = dY / dashes;

	var q = 0;
	while (q++ < dashes) {
		x1 += dashX;
		y1 += dashY;
		this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
	}
	this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
};


var GridDrawer = function (canvas) {
	this.init = function () {
		//App.events['renderBackground'].subscribe(this.draw);
	};


	var bgImg = new Image();
	var bgLoaded = false;
	bgImg.onload = function () {
		bgLoaded = true;
		canvas.renderAll();
	};
	bgImg.src = "/img/bg.jpg";

	var logoImg = new Image();
	var logoLoaded = false;
	logoImg.onload = function () {
		logoLoaded = true;
		canvas.renderAll();
	};
	logoImg.src = "/img/logo-mf.png";


	this.draw = function() {
		//return;
		var viewport = canvas.viewport;
		var zoom = viewport.zoom;
		var context = canvas.getContext("2d");


		var clientRect = new Rectangle(-viewport.translate().x,  -viewport.translate().y, canvas.getWidth() / zoom, canvas.getHeight() / zoom);
		if (bgLoaded) {
			var pattern = context.createPattern(bgImg, 'repeat');
			context.rect(0, 0, canvas.width, canvas.height);
			context.fillStyle = pattern;
			context.fill();
		}


		canvas.beginDraw(context);
		/*
		if (zoom > 0.5) {
			context.setLineDash([1, 3]);
			for (var x = GridHelper.round(clientRect.left); x < clientRect.right; x += GridHelper.size) {
				context.moveTo(x, clientRect.top);
				context.lineTo(x, clientRect.bottom);
				//context.dashedLine(x, clientRect.top, x, clientRect.bottom,1);
			}

			for (var y = GridHelper.round(clientRect.top); y < clientRect.bottom; y += GridHelper.size) {
				context.moveTo(clientRect.left, y);
				context.lineTo(clientRect.right, y);
				//context.dashedLine(clientRect.left, y, clientRect.right, y,1);
			}
		}
		*/

		context.strokeStyle = "#ddd";
		context.stroke();

		canvas.endDraw(context);

		if (logoLoaded) {
			context.drawImage(logoImg, 770, 20);
		}
	}
};