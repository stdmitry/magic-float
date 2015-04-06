/**
 * Created by dmitry on 10.03.15.
 */
var Drawer = function (canvas, ctrl) {
    var drawer = this;
    this.map = {};
	this.items = [];

	this.drawAll = function (items) {
        items.forEach(function (el) {
            drawer.draw(el);
        });
    };

    this.draw = function (item, callback) {
		var mapId = item.pos.uniqueId();
        if (drawer.map[mapId ]) {
			console.log('dublicate draw to pos ', item.pos.uniqueId());
			return;
		}
		createObj(item, function (obj) {
			drawer.map[mapId] = { item: item, obj: obj};
			drawer.items.push( { obj: obj, zindex:obj.zindex });
			canvas.add(obj);
			drawer.renderAll();
		});
    };


	this.renderAll = function() {
		var items = StorageMan.getItems();
		if (items.length > drawer.items.length)
			return;
		canvas.renderAll();
	};


	this.invalidate = function () {
		drawer.map = {};
		drawer.items = [];
		canvas.clear();
		drawer.drawAll(StorageMan.getItems());
		canvas.renderAll();
	};

	function createObj(item, callback) {
		var coords = GridHelper.getCoords(item.pos);
		var imgName = item.type + '_' + item.color;

		getImage('/img/p/'+imgName+'.png', function(img) {
			var oImg = img.set({
				left: coords.x-5,
				top: coords.y-5,
				zindex: coords.z,
				selectable:false,
				opacity: getOpacity(item.pos),
				width: item.width()+13,
				height:item.height()+13
			});
			callback(oImg);
		});
	}

	var images = {};
	function getImage(url, callback) {
		//if (images[url])
		//	callback(images[url]);
		//else
		fabric.Image.fromURL(url, function(img) {
			images[url] = img;
			callback(img);
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