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
		changeItems: new SimpleEvent(),
		addItem: new SimpleEvent(),
		changeLevel: new SimpleEvent(),
		renderBackground: new SimpleEvent()
	};

	this.controller = null;
	this.canvas = null;
	this.run = function () {
		app.canvas = new fabric.CanvasWithViewport("myCanvas", {selection:false, backgroundColor:'#0d5e95' });
		app.canvas.setHeight($('.pontoon-canvas').innerHeight());
		app.canvas.setWidth($('.pontoon-canvas').innerWidth());
		this.setupEventListen();
		app.controller = new The2DController(app.canvas);
		app.controller.init();
		app.canvas.renderAll();
	};

	this.setupEventListen = function () {
		var events = [
			'mouse:move',
			'mouse:down'
		];

		events.forEach(function (name) {
			var names = name.split(':');
			names.forEach(function (el, index, array) { if (index > 0) array[index] = el.ucfirst(); } );
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
		if (app.events[name])
			app.events[name].fire(event);
		else
			console.log('ERROR: unknown event ' + name);
	};

	this.subscribe = function(name, callback) {
		if (app.events[name])
			app.events[name].subscribe(callback);
		else
			console.log('ERROR: unknown event subscribe ' + name);
	};

	this.fire = function (name, event) {
		if (app.events[name])
			app.events[name].fire(event);
		else
			console.log('ERROR: unknown event fire ' + name);
	};

	return this;
};