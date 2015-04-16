/**
 * Created by dmitry on 3/6/15.
 */
var The2DController = function (canvas) {
	var currentLevel = 1;
	var currentMode = '2D';
	//var currentMode = '3D';
	var ctrl = this;

	this.canvas = canvas;
	this.gridDrawer = new GridDrawer(canvas);
    this.model = new Model();
	this.itemDrawer = null
    this.tool = null ;

	this.init = function() {
		bindEvents();
		this.onChangeMode();
		ctrl.gridDrawer.init();
        ctrl.model.init();

		StorageMan.init();
		StorageMan.load();

		//canvas.setZoom(canvas.getZoom()*2);
	};

    this.onMouseDown = function (e) {
		if (ctrl.tool)
			ctrl.tool.onMouseDown(e);
    };

    this.onMouseMove = function (e) {
		if(ctrl.tool && ctrl.tool.onMouseMove)
			ctrl.tool.onMouseMove(e);
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

	this.setType = function(type) {
		currentType = type;
		if (ctrl.tool && ctrl.tool.setType)
			ctrl.tool.setType(type); // возможно, правильней было бы создавать новый тул
	};

	this.addItem = function(item) {
		StorageMan.addItem(item);
	};

	this.deleteItem = function (pos) {
		var item = ctrl.model.getItem(pos);
		StorageMan.deleteItem(item);
	};

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
		ctrl.tool = createTool();
		ctrl.itemDrawer = createDrawer();
		ctrl.invalidate();
	};

	this.selectTool = function (tool, params) {
		switch(tool) {
			case 'ponton':
				ctrl.tool = new PontonTool(canvas, ctrl, params);
				return;
			case 'eraser':
				ctrl.tool = new EraserTool(canvas, ctrl, params);
		}
	};

	function createDrawer () {
		return  currentMode == '2D'
				? new Drawer(canvas, ctrl)
				: new Drawer3D(canvas, ctrl);
	}

	function createTool () {
		return null;
		return currentMode == '2D' ? ctrl.tool : null;
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

		$(document).on('click', '.eraser-tool', function () {
			ctrl.selectTool('eraser', $(this).data());
		});


		$(document).on('click', '.magicfloat-element-type a.tool', function () {
			$('.magicfloat-element-type li').removeClass('active');
			$(this).parent().addClass('active');
			ctrl.selectTool('ponton', $(this).data());
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
			ctrl.model.recalc();
            StorageMan.setMounts(ctrl.model.mountEls);

			Popup.show('/site/calculate', {data:ctrl.model.itemCnt, callback: function(popup){

			}});
		});

		$(document).on('click', '.magicfloat-save', function (e) {
			e.preventDefault();
			$.ajax({url:'/site/save', data: JSON.stringify(StorageMan.data), method:'POST', success:function(response) {

			}});
		});

		$(document).on('click', '.box-products .btn', function (e) {
			e.preventDefault();
			var pushed = $(this).hasClass('pushed');
			$(this).parent().find('.btn').removeClass('pushed');
			if (!pushed)
				$(this).addClass('pushed');

			$('.pontoon-sidebar').each(function (){
				var bar = $(this).data('bar');
				var visible = $('.box-products .btn[data-bar='+bar+']').hasClass('pushed');
				visible ? $(this).show() : $(this).hide();
			});
		});

		$(document).on('click', '.pontoon-zoomer a', function(event) {
			var delta = $(this).hasClass('plus') ? 3 : -3 ;
			canvas.setZoom(canvas.getZoom()*(1 + 0.05*delta));
		});

	}
};