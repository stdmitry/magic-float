/**
 * Created by dmitry on 10.03.15.
 */
var Drawer3D = function (canvas, ctrl) {
    var drawer = this;
    this.map = {};
	this.items = [];

	this.init = function (level) {
		drawer.level = level;
		//bindEvents();
	};

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

		createObj(item, function (obj) {
			drawer.map[mapId] = { item: item, obj: obj};
			drawer.items.push( { obj: obj, zindex:obj.zindex });
			drawer.renderAll();
		});
    };

	this.renderAll = function() {
		var items = StorageMan.getItems();
		if (items.length > drawer.items.length)
			return;


		drawer.items.sort(function (a, b) {return a.zindex -  b.zindex;});
		for(var i = 0; i < drawer.items.length; ++i) {
			canvas.add(drawer.items[i].obj);
		}
		canvas.renderAll();
	};


	this.invalidate = function () {
		drawer.map = {};
		drawer.added = 0;
		canvas.clear();
		drawer.drawAll(StorageMan.getItems());
		canvas.renderAll();
	};


	function createObj(item, callback) {
        var coords = GridHelper.get3DCoords(item.pos);
		fabric.Image.fromURL('image/cube2.png', function(img) {
			var oImg = img.set({
				left: coords.x,
				top: coords.y,
				zindex: coords.z,
				selectable:false,
				width: 70,
				height: 70,
			});
			callback(oImg);
			//canvas.add(oImg).renderAll();
		});
    }
};