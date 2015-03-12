/**
 * Created by dmitry on 3/6/15.
 */
var StorageMan = new function () {
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

	this.data = {};

	this.load = function () {
		this.data = $.localStorage.get('data') || {};
        if (this.data.items)
            this.data.items.forEach(function (el, index, array) {
                array[index] = Item.create(el);
            });
	};

	this.save = function () {
		$.localStorage.set('data', this.data);
	};

	this.getItems = function () {
		return this.data.items || [];
	};

	this.addItem = function (item) {
		this.data.items = this.data.items|| [];
		this.data.items.push(item);
	}
};