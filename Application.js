/**
 * Created by dmitry on 3/6/15.
 */

var Application = function () {
	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var app = this;
	window.App = this;

	this.events = {
		mouseDown: new SimpleEvent(),
		mouseMove: new SimpleEvent(),
		resetItems: new SimpleEvent(),
		renderBackground: new SimpleEvent(),
	};


	this.controller = null;
	this.canvas = null;
	this.run = function () {
		app.canvas = new fabric.CanvasWithViewport("myCanvas", {selection:false});
		app.bindEvents();
		this.setupEventListen();
		StorageMan.load();
		app.controller = new The2DController(app.canvas);
		app.controller.init();
		app.canvas.renderAll();
	};

	this.bindEvents = function () {
		$(document).on('click', '.reset-items', function (e) {
			e.preventDefault();
			app.events['resetItems'].fire();
		});
	};

	this.setupEventListen = function () {
		var events = [
			'mouse:move',
			'mouse:down',
		];

		events.forEach(function (name) {
			var names = name.split(':');
			names.forEach(function (el, index, array) { array[index] = el.ucfirst(); } );
			var localName = names.join('');
			app.canvas.on(name, function (e){
				app.handleEvent(localName,e);
			});
		});

		// наши типа-события
		app.canvas.onRenderBackground = function () {
			app.handleEvent('renderBackground',{});
		};

	};

	this.handleEvent = function(name, event) {
		app.events[name].fire(event);
	};

	return this;
};