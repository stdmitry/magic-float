/**
 * Created by dmitry on 10.03.15.
 */
var CursorDrawer = function(canvas, model) {
    var currentObject = null;
    var lastX = null;
    var lastY = null;

    this.onMouseMove = function (e) {
        if (!currentObject)
            currentObject = createCursor(123);

        var x = GridHelper.round(e.e.clientX-25);
        var y = GridHelper.round(e.e.clientY-25);

        if (x != lastX || y != lastY) {
            var color = model.canAdd(x,y) ? 'green' : 'red';
            currentObject.setColor(color);
            currentObject.set('left',GridHelper.round(e.e.clientX-25));
            currentObject.set('top', GridHelper.round(e.e.clientY-25));
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