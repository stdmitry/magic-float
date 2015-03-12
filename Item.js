/**
 * Created by dmitry on 3/6/15.
 */
var Item = function (x,y, type) {
	this.type = type || 'block';
    this.x = x;
	this.y = y;



};

Item.prototype.setCoords = function(x, y) {
	this.canvasObj.set('left', x);
	this.canvasObj.set('top', y);
};

Item.prototype.keyId = function () {
    return this.x + '_'+this.y + '_' + this.type;
};

Item.create = function(obj) {
    return new Item(obj.x, obj.y, obj.type)
};