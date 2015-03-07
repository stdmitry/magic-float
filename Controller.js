/**
 * Created by dmitry on 3/6/15.
 */
var The2DController = function (canvas) {
	var currentObjectType = null;
	//var objects = StorageMan.getObjects();
	var ctrl = this;
	this.canvas = canvas;
	this.gridDrawer = new GridDrawer(canvas);

	this.onMouseDown = function (e) {
		addItem(GridHelper.round(e.e.clientX-25), GridHelper.round(e.e.clientY-25));
	};

	this.onRenderBackground = function (e) {
		this.gridDrawer.draw();
	};

	function addItem(x, y) {
		var item = new Item(x,y);
		item.draw(ctrl.canvas);
		StorageMan.addItem(item);
		StorageMan.save();
	}

};