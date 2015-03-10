/**
 * Created by dmitry on 10.03.15.
 */
var Drawer = function (canvas) {
    var drawer = this;
    this.map = {};
    this.drawAll = function (items) {
        items.forEach(function (el) {
            drawer.draw(el);
        });
    };

    this.draw = function (item) {
        if (!drawer.map[item.keyId()]) {
            drawer.map[item.keyId()] = {
                item: item,
                obj: createObj(item)
            };

            canvas.add(drawer.map[item.keyId()].obj)
        }
    };

    function createObj(item) {
        return new fabric.Rect({
            id: item.keyId(),
            left: item.x,
            top: item.y,
            fill: 'blue',
            width: 50,
            height: 50,
            selectable: false
        });
    };
};