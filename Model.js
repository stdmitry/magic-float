/**
 * Created by dmitry on 10.03.15.
 */
var Model = function() {
    this.blockMap = {};
 	this.mountMap = {};
    var model = this;


	this.init = function () {
        bindEvents();
    };

	this.onChangeItems = function () {
		model.blockMap = {};
		StorageMan.getItems().forEach(function(el) {
			model.addItem(el);
		});
	};

	this.addItem = function(item) {
		var places = item.getPlaces();
		var mounts = item.getMounting();
		places.forEach(function (el) { model.blockMap[el.uniqueId()] = item; } );
    	mounts.forEach(function (el) { model.mountMap[el.pos.uniqueId()] |= el.type; }  );
	};

    this.canAdd = function(pos, type) {
		var test = Item.create({pos:pos, type:type});
        var result = true;
		var places = test.getPlaces();
		places.forEach(function (el) { result = result && !(model.blockMap[el.uniqueId()]); } );
		if (result) {
			var mounts = test.getMounting();
			mounts.forEach(function (el) { result = result && !(model.mountMap[el.pos.uniqueId()] & el.type); } );
		}


		return result;
    };

	function bindEvents () {
		App.subscribe('changeItems', model.onChangeItems);
	}
};