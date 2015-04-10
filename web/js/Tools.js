/**
 * Created by dmitry on 4/9/15.
 */
var PontonTool = function(canvas, ctrl, params) {
	var currentObject = null;
	var model = ctrl.model;
	var tool = this;

	this.type = params.type;
	this.pos = new Pos({x:null, y:null, z:null});

	this.init = function () { };

	this.setType = function (type) { tool.type = type; };

	this.onMouseDown = function (e) {
		var pos = tool.pos;
		if (model.canAdd(pos.x, pos.y, tool.type))
			ctrl.addItem(pos);
	};

	this.onMouseMove = function (e) {
		var pointer = canvas.getPointer(e.e);
		var pos = new Pos(GridHelper.getPos(pointer),ctrl.getLevel());
		if (!tool.pos.equals(pos)) {
			if (currentObject)
				currentObject.remove();

			tool.pos = pos;
			var color = model.canAdd(pos, tool.type) ? 'green' : 'red';
			currentObject = createCursor(pos, color, tool.type);
			canvas.renderAll();
		}
	};

	function createCursor(pos, color, type) {
		var coords = GridHelper.getCoords(pos);
		var test = Item.create({pos:pos, type:type});
		var size = {width: test.width(), height: test.height()};
		var params = {
			id: 'cursorObj',
			left: coords.x,
			top: coords.y,
			fill: color,
			opacity: 0.5,
			selectable:false,
			zindex:9999
		};

		var obj = new fabric.Rect($.extend(size, params));
		canvas.add(obj);
		return obj;
	}
};

var EraserTool = function (canvas, ctrl) {
	var model = ctrl.model;
	var tool = this;
	var currentObject = null;
	this.type = 'sb_105';
	this.pos = new Pos({x:null, y:null, z:null});

	this.onMouseDown = function (e) {
		var pos = tool.pos;
		if (model.getItem(pos))
			ctrl.deleteItem(pos);
	};

	this.onMouseMove = function (e) {
		var pointer = canvas.getPointer(e.e);
		var pos = new Pos(GridHelper.getPos(pointer),ctrl.getLevel());
		if (!tool.pos.equals(pos)) {
			if (currentObject)
				currentObject.remove();

			tool.pos = pos;

			var obj = model.getItem(pos);
			if (obj) {
				currentObject = createCursor(pos, obj);
				canvas.renderAll();
			}
		}
	};

	function createCursor(pos, obj) {
		var coords = GridHelper.getCoords(pos);
		var size = {width: obj.width(), height: obj.height()};
		var params = {
			id: 'cursorObj',
			left: coords.x,
			top: coords.y,
			fill: 'red',
			opacity: 0.5,
			selectable:false,
			zindex:9999
		};

		var cursor  = new fabric.Rect($.extend(size, params));
		canvas.add(cursor );
		return cursor ;
	}
};