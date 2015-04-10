/**
 * Created by dmitry on 3/6/15.
 */
var StorageMan = new function () {
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

	var storage = this;
	this.data = {};


	this.init = function () {
		bindEvents();
	};

	this.load = function () {
		storage.data = $.localStorage.get('data') || {};
        if (storage.data.items)
			storage.data.items.forEach(function (el, index, array) {
                array[index] = Item.create(el);
            });

		App.fire('changeItems');
	};

	this.save = function () {
		$.localStorage.set('data', this.data);
	};

	this.loadFromFile = function (data) {
		this.data = data;
		$.localStorage.set('data', this.data);
	};

	this.getItems = function () {
		return storage.data.items || [];
	};

	this.addItem = function (item) {
		storage.data.items = this.data.items|| [];
		storage.data.items.push(item);
		App.fire('addItem', item);
		storage.save();
	};

	this.deleteItem = function (item) {
		var index = storage.data.items.indexOf(item);
		storage.data.items.splice(index, 1);
		App.fire('changeItems');
	};


	this.onResetItems = function ()	{
		console.log('StorageMan:onResetItems');
		storage.data.items = [];
		App.fire('changeItems');
	};

	this.onChangeItems = function () {
		storage.save();
	};

	function bindEvents() {
		App.subscribe('resetItems',StorageMan.onResetItems);
		App.subscribe('changeItems',StorageMan.onChangeItems);
	}

	return this;
};