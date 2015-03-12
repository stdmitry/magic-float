/**
 * Created by dmitry on 3/6/15.
 */
var The2DController = function (canvas) {
	var currentType = 'block';
	//var objects = StorageMan.getObjects();
	var ctrl = this;
	this.canvas = canvas;
	this.gridDrawer = new GridDrawer(canvas);
    this.itemDrawer = new Drawer(canvas);
    this.model = new Model();
    this.cursorDrawer = new CursorDrawer(canvas, this.model);

	this.init = function() {
		ctrl.bindEvents();
		ctrl.gridDrawer.init();
        ctrl.itemDrawer.drawAll(StorageMan.getItems());
        ctrl.model.init(StorageMan.getItems());
    };

    this.onMouseDown = function (e) {
		addItem(this.cursorDrawer.lastPos);
    };

    this.onMouseMove = function (e) {
        ctrl.cursorDrawer.onMouseMove(e);
    };

	this.onRenderBackground = function (e) {
		this.gridDrawer.draw();
	};

	function addItem(pos) {
		var item = new Item(pos.x,pos.y, currentType);
		ctrl.itemDrawer.draw(item);
		ctrl.model.addItem(item);
        StorageMan.addItem(item);
		StorageMan.save();
	}

	function bindEvents() {

	}
};