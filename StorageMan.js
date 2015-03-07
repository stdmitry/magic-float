/**
 * Created by dmitry on 3/6/15.
 */
var StorageMan = new function () {
	this.data = {};

	this.load = function () {
		this.data = $.localStorage.get('data') || {};
	};

	this.save = function () {
		$.localStorage.set('data', this.data);
	};

	this.getItems = function () {
		return data.items || [];
	};

	this.addItem = function (item) {
		this.data.items = this.data.items|| [];
		this.data.items.push(item);
	}
};