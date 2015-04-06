/**
 * Created by dmitry on 3/6/15.
 */
var The2DController = function (canvas) {
	var currentType = 'sb_105';
	var currentLevel = 1;
//	var currentMode = '2D';
	var currentMode = '3D';
	var ctrl = this;

	this.canvas = canvas;
	this.gridDrawer = new GridDrawer(canvas);
    this.itemDrawer = null
    this.model = new Model();
    this.cursorDrawer = new CursorDrawer(canvas,this);

	this.init = function() {
		bindEvents();
		this.onChangeMode();
		ctrl.cursorDrawer.init();
		ctrl.gridDrawer.init();
        ctrl.model.init();

		StorageMan.init();
		StorageMan.load();

		canvas.setZoom(canvas.getZoom()*2);
	};

    this.onMouseDown = function (e) {
		if (currentMode == '3D')
			return;

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

	this.onAddItem = function (item) {
		ctrl.itemDrawer.draw(item);
		ctrl.model.addItem(item);
	};


	this.onChangeLevel = function (level) {
		ctrl.invalidate();
	};

	this.invalidate = function () {
		ctrl.itemDrawer.invalidate();
	};

	this.onChangeMode = function () {
		ctrl.itemDrawer = createDrawer();
		ctrl.cursorDrawer.setActive(currentMode == '2D');
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
		App.subscribe('addItem', ctrl.onAddItem);
		App.subscribe('changeLevel', ctrl.onChangeLevel);
		App.subscribe('renderBackground',ctrl.onRenderBackground);


		$(document).on('mousewheel', function(event) {
			canvas.setZoom(canvas.getZoom()*(1 + 0.05*event.deltaY));
		});


		$(document).on('keydown', function(event) {
			if (event.keyCode == 32) {
				canvas.isGrabMode = true;
				$(document.body).css( 'cursor', 'move' ); // todo: не работает
			}
		});

		$(document).on('keyup', function(event) {
			if (event.keyCode == 32) {
				canvas.isGrabMode = false;
				$(document.body).css( 'cursor', 'crosshair' );
			}
		});

		$(document).on('change', '.level-select', function () {
			currentLevel = parseInt($('.level-select').val());
			App.fire('changeLevel', currentLevel);
		});

		$(document).on('click', '.magicfloat-element-type a', function () {
			$('.magicfloat-element-type li').removeClass('active');
			$(this).parent().addClass('active');
			currentType = $(this).parent().data('type');
			//App.fire('changeType');
		});

		$(document).on('click', '.magicfloat-view-mode .btn.off', function () {
			$(this).parent().find('.btn.on').removeClass('on').addClass('off');
			$(this).addClass('on').removeClass('off');
			currentMode = $(this).data('value');
			ctrl.onChangeMode();
		});

		$(document).on('click', '.magicfloat-reset', function (e) {
			e.preventDefault();
			App.fire('resetItems');
		});

		$(document).on('click', '.magicfloat-calculate', function (e) {
			e.preventDefault();
			ctrl.model.relcalc();
			Popup.show('/site/calculate', {data:ctrl.model.itemCnt, callback: function(popup){

			}});
		});

		$(document).on('click', '.magicfloat-save', function (e) {
			e.preventDefault();
			$.ajax({url:'/site/save', data: JSON.stringify(StorageMan.data), method:'POST', success:function(response) {

			}});
		});

	}
};