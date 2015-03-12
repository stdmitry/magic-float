/**
 * Created by dmitry on 3/12/15.
 */
var SimpleEvent = function () {
	this.handlers = [];  // observers
};

SimpleEvent.prototype = {
	subscribe: function(fn) {
		this.handlers.push(fn);
	},
	unsubscribe: function(fn) {
		this.handlers = this.handlers.filter(
			function(item) {
				if (item !== fn) {
					return item;
				}
			}
		);
	},
	fire: function(o, thisObj) {
		var scope = thisObj || window;
		this.handlers.forEach(function(item) {
			item.call(scope, o);
		});
	}
}