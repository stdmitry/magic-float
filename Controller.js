/**
 * Created by dmitry on 3/6/15.
 */
var The2DController = function (canvas) {
	var currentType = 'block';
	var currentLevel = 1;
	var currentMode = '2D';
//	var currentMode = '3D';
	var ctrl = this;

	this.canvas = canvas;
	this.gridDrawer = new GridDrawer(canvas);
    this.itemDrawer = null
    this.model = new Model();
    this.cursorDrawer = new CursorDrawer(canvas,this);

	this.init = function() {
		bindEvents();
		ctrl.itemDrawer = createDrawer();

		ctrl.cursorDrawer.init();
		ctrl.gridDrawer.init();
        ctrl.model.init();

		StorageMan.init();
		StorageMan.load();
	};

    this.onMouseDown = function (e) {
		var pos = ctrl.cursorDrawer.lastPos;
		if (ctrl.model.canAdd(pos.x, pos.y, currentType))
			addItem(ctrl.cursorDrawer.lastPos);
    };

    this.onMouseMove = function (e) {
		var i = 0;
    };

	this.onRenderBackground = function (e) {
		if (currentMode == '2D')
			ctrl.gridDrawer.draw();
	};

	this.getLevel = function () {
		return currentLevel;
	};

	this.getType = function () {
		return currentType;
	};

	function addItem(pos) {
		var item = Item.create({pos:pos, type:currentType});
		StorageMan.addItem(item);
	}

	this.onChangeItems = function () {
		ctrl.invalidate();
	};

	this.onChangeLevel = function (level) {
		ctrl.invalidate();
	};

	this.invalidate = function () {
		ctrl.itemDrawer.invalidate();
	};

	this.onChangeMode = function () {
		ctrl.itemDrawer = createDrawer();
		ctrl.invalidate();
	};

	function createDrawer () {
		return  currentMode == '2D'
				? new Drawer(canvas, ctrl)
				: new Drawer3D(canvas, ctrl);
	}

	function bindEvents() {
		App.subscribe('mouseMove', ctrl.onMouseMove);
		App.subscribe('mouseDown', ctrl.onMouseDown);

		App.subscribe('changeItems', ctrl.onChangeItems);
		App.subscribe('changeLevel', ctrl.onChangeLevel);
		App.subscribe('renderBackground',ctrl.onRenderBackground);

		$(document).on('click', '.reset-items', function (e) {
			e.preventDefault();
			App.fire('resetItems');
			//StorageMan.save()
		});

		$(document).on('mousewheel', function(event) {
			canvas.setZoom(canvas.getZoom()*(1 - 0.05*event.deltaY));
		});

		$(document).on('change', '.level-select', function () {
			currentLevel = parseInt($('.level-select').val());
			App.fire('changeLevel', currentLevel);
		});

		$(document).on('change', '.type-select', function () {
			currentType = $('.type-select').val();
			//App.fire('changeType', type);
		});

		$(document).on('change', '.mode-select', function () {
			currentMode = $('.mode-select').val();
			ctrl.onChangeMode();
			//App.fire('changeType', type);
		});

	}

};