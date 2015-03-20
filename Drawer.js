/**
 * Created by dmitry on 10.03.15.
 */
var Drawer = function (canvas, ctrl) {
    var drawer = this;
    this.map = {};

	this.drawAll = function (items) {
        items.forEach(function (el) {
            drawer.draw(el);
        });
    };

    this.draw = function (item) {
		var mapId = item.pos.uniqueId();
        if (drawer.map[mapId ]) {
			console.log('dublicate draw to pos ', item.pos.uniqueId());
			return;
		}

		drawer.map[mapId] = { item: item, obj: createObj(item) };
		canvas.add(drawer.map[mapId].obj)
    };


	this.invalidate = function () {
		drawer.map = {};
		canvas.clear();
		drawer.drawAll(StorageMan.getItems());
		canvas.renderAll();
	};

    function createObj(item) {
        var coords = GridHelper.getCoords(item.pos);
		return new fabric.Rect({
            id: item.uniqueId(),
            left: coords.x,
            top: coords.y,
            fill: 'blue',
			opacity: getOpacity(coords),
            width: 50,
            height: 50,
            selectable: false
        });
    }

	function getOpacity (coords) {
		if (ctrl.getLevel() == coords.z)
			return 1;
		if (ctrl.getLevel() > coords.z)
			return 0.5;

		return 0;
	}
};