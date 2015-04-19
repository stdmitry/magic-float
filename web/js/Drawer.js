/**
 * Created by dmitry on 10.03.15.
 */
var Drawer = function (canvas, ctrl) {
    var drawer = this;
    this.map = {};
	this.items = [];
    this.itemCnt = 0;

	this.drawAll = function (items) {
        items.forEach(function (el) {
            drawer.draw(el, drawer.renderAll);
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
			if (!callback){
                canvas.add(obj);
                drawer.renderAll();
            } else
                callback();
		});
    };

	this.renderAll = function() {
		//var items = StorageMan.getAll();
		if (drawer.itemCnt > drawer.items.length)
			return;

        drawer.items.sort(function (a, b) {return a.zindex -  b.zindex;});
        for(var i = 0; i < drawer.items.length; ++i) {
            canvas.add(drawer.items[i].obj);
        }
		canvas.renderAll();
	};

	this.invalidate = function () {
		drawer.map = {};
		drawer.items.forEach(function (el) {
            el.obj.remove();
        });
        drawer.items = [];
        drawer.itemCnt = 0;
		canvas.clear();
		drawer.drawAll(StorageMan.getAll());
		canvas.renderAll();
	};

    var simpleObjectCreator = function (coords, item, callback) {
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
    };

    var furnitureObjectCreator = function (coords, item, callback) {
        var imgName = item.type;
        getImage('/img/m/'+imgName+'.png', function(img) {
            var oImg = img.set({
                left: coords.x - (50/2),
                top: coords.y - (70/2),
                zindex: coords.z+0.5,
                selectable:false,
                opacity: getOpacity(item.pos),
                width: 50,
                height:70
            });
            callback(oImg);
        });
    };

    var creators = {
        'sb_105': simpleObjectCreator,
        'sb_101': simpleObjectCreator,
        'se_105': simpleObjectCreator,
        'sa_202': furnitureObjectCreator,
    };

    function createObj(item, callback) {
        if (creators[item.type]) {
            drawer.itemCnt++;
            var coords = GridHelper.getCoords(item.pos);
            creators[item.type](coords, item, callback);
        }
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