/**
 * Created by dmitry on 10.03.15.
 */
var CursorDrawer = function(canvas, ctrl) {
    var currentObject = null;
    var that = this;
	this.lastPos = new Pos({x:null, y:null, z:null});
	this.init = function () {
		bindEvents();
	};

    this.onMouseMove = function (e) {
		var pointer = canvas.getPointer(e.e);
		var pos = new Pos(GridHelper.getPos(pointer),ctrl.getLevel());
        if (!that.lastPos.equals(pos)) {
            if (currentObject)
				currentObject.remove();

			that.lastPos = pos;
			var color = ctrl.model.canAdd(pos, ctrl.getType()) ? 'green' : 'red';
			currentObject = createCursor(pos, color, ctrl.getType());
            canvas.renderAll();
        }
    };

    function createCursor(pos, color, type) {
		var coords = GridHelper.getCoords(pos);
        var size = itemSize(type);
		var params = {
			id: 'cursorObj',
			left: coords.x,
			top: coords.y,
			fill: color,
			opacity: 1,
			selectable:false,
			zindex:9999
		};

		var obj = new fabric.Rect($.extend(size, params));
       	canvas.add(obj);
        return obj;
    }

	function itemSize(type) {
		switch(type) {
			case 'block': return { width: 50, height: 50 };
			case 'block2x': return { width: 100, height: 50 };
			case 'block2x90': return { width: 50, height: 100 };
		}
		console.log('Unknown block type ' + type);
		return { width: 50, height: 50 };
	}

	function bindEvents() {
		App.subscribe('mouseMove', that.onMouseMove);
	}
};