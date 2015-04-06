/**
 * Created by dmitry on 10.03.15.
 */
var CursorDrawer = function(canvas, ctrl) {
    var currentObject = null;
    var that = this;
	var active = true;
	this.lastPos = new Pos({x:null, y:null, z:null});
	this.init = function () {
		bindEvents();
	};

    this.onMouseMove = function (e) {
		if (!active)
			return;

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

	this.setActive =  function (val) {
		active = val;
		if (!active && currentObject) {
			currentObject.remove();
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
			opacity: 1,
			selectable:false,
			zindex:9999
		};

		var obj = new fabric.Rect($.extend(size, params));
       	canvas.add(obj);
        return obj;
    }


	function bindEvents() {
		App.subscribe('mouseMove', that.onMouseMove);
	}

};