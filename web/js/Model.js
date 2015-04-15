/**
 * Created by dmitry on 10.03.15.
 */
var Model = function() {
    this.blockMap = {};
    var model = this;
	this.mount = new Mount();
	this.mountEls = [];
	//this.mountCnt = {};
	this.itemCnt = {};

	this.init = function () {
        bindEvents();
    };

	this.onChangeItems = function () {
		model.blockMap = {};
		model.mount.clear();
		StorageMan.getItems().forEach(function(el) {
			model.addItem(el);
		});
	};

	this.addItem = function(item) {
		var places = item.getPlaces();
		var mount = item.getMounting();
		places.forEach(function (el) { model.blockMap[el.uniqueId()] = item; } );
    	model.mount.addMount(mount);
	};

	this.getItem = function (pos) {
		var test = model.blockMap[pos.uniqueId()];
		return test ? test : false;
	};

    this.canAdd = function(pos, type) {
		var test = Item.create({pos:pos, type:type});
        var result = true;
		var places = test.getPlaces();
		places.forEach(function (el) { result = result && !(model.blockMap[el.uniqueId()]); } );
		if (result) {
			var mount = test.getMounting();
			result = !model.mount.isIntersect(mount);
		}

		return result;
    };

	this.relcalc = function () {
		model.mountEls = [];
		model.mount.forEach(function (el) {
			var cnt = Mount.count(el);
			if (cnt == 4)
				model.mountEls.push({pos:el.pos, type:'sa_202'});
			else if (cnt > 1) {
				model.mountEls.push({pos:el.pos, type:'sa_402'});
				for (var i = 0; i < Mount.shimsCnt(el); ++i)
					model.mountEls.push({pos:el.pos, type:'sa_401'});
			}
		});

		model.itemCnt = {};
		model.mountEls.forEach(function (el) {
			if (model.itemCnt [el.type])
				++model.itemCnt [el.type];
			else
				model.itemCnt [el.type] = 1;
		});

		StorageMan.getItems().forEach(function(el) {
			if (model.itemCnt [el.type])
				++model.itemCnt [el.type];
			else
				model.itemCnt [el.type] = 1;
		});
	};

	function bindEvents () {
		App.subscribe('changeItems', model.onChangeItems);
	}
};