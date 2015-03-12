/**
 * Created by dmitry on 10.03.15.
 */
var CursorDrawer = function(canvas, model) {
    var currentObject = null;
    this.lastPos = {x:null, y:null};
	this.lastY = null;

    this.onMouseMove = function (e) {
        if (!currentObject)
            currentObject = createCursor(123);

        var pointer = canvas.getPointer(e.e);
		var x = GridHelper.round(pointer.x-25);
        var y = GridHelper.round(pointer.y-25);

        if (x != this.lastPos.x || y != this.lastPos.y) {
            this.lastPos = {x:x, y:y};
			var color = model.canAdd(x,y) ? 'green' : 'red';
            currentObject.setColor(color);
            currentObject.set('left',x);
            currentObject.set('top', y);
            currentObject.setCoords();
            canvas.renderAll();
        }
    };

    function createCursor(type) {
        var obj = new fabric.Rect({
            id: 'cursorObj',
            left: 0,
            top: 0,
            fill: 'green',
            opacity: 1,
            width: 50,
            height: 50,
            selectable:false,
            zindex:9999
        });
        canvas.add(obj);
        return obj;
    }
};