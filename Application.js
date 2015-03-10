/**
 * Created by dmitry on 3/6/15.
 */

var Application = new function () {
	var App = this;

	this.controller = null;
	this.canvas = null;
	this.run = function () {
		App.canvas = new fabric.CanvasWithViewport("myCanvas", {selection:false});
		this.setupEventListen();
		StorageMan.load();
		App.controller = new The2DController(App.canvas);
        App.controller.init();
		App.canvas.renderAll();
	};

	this.setupEventListen = function () {
		var events = [
			'mouse:move',
			'mouse:down',
		];

		events.forEach(function (name) {
			var names = name.split(':');
			names.forEach(function (el, index, array) { array[index] = el.ucfirst(); } );
			var localName = 'on'+names.join('');
			App.canvas.on(name, function (e){
				App.handleEvent(localName,e);
			});
		});

		// наши типа-события
		App.canvas.onRenderBackground = function () {
			App.handleEvent('onRenderBackground',{});
		};

	};

	this.handleEvent = function(name, event) {
		if (App.controller && App.controller.hasOwnProperty(name))
			App.controller[name](event);
	};
};