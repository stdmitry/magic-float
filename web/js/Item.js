/**
 * Created by dmitry on 3/6/15.
 */
var Pos = function (obj, z) {
	this.x = obj.x;
	this.y = obj.y;
	this.z = obj.z || z;
};

Pos.prototype.uniqueId = function () {
	return [this.x,this.y,this.z].join('_');
};

Pos.prototype.equals = function(o) {
	return this.x == o.x && this.y == o.y && this.z == o.z;
};

var Item = function (pos, type, color, angle) {
	this.type = type || 'block';
    this.pos = new Pos(pos);
	this.color = color || 'blue';
	this.angle = angle || 0;
};

Item.simple = ['se_105', 'sb_105'];

Item.prototype.isSimple = function (){
	return Item.simple.indexOf(this.type) != -1;
};

Item.prototype.uniqueId = function () {
	return this.pos.uniqueId();
};

Item.prototype.getPlaces = function() {
	if (this.isSimple())
		return [this.pos];

	var pos2 = new Pos(this.pos);
	this.angle == 0
		? (pos2.x = this.pos.x + 1)
		: (pos2.y = this.pos.y + 1);
	return [this.pos, pos2];
};

Item.getSimpleMount = function (pos) {
	return  [
		{type:1, pos: new Pos({x:pos.x, y:pos.y, z:pos.z})},
		{type:2, pos: new Pos({x:pos.x, y:pos.y + 1, z:pos.z})},
		{type:3, pos: new Pos({x:pos.x + 1, y:pos.y + 1, z:pos.z})},
		{type:4, pos: new Pos({x:pos.x + 1, y:pos.y, z:pos.z})}
	];
};

Item.prototype.getMounting = function() {
	var items = [];
	if (!this.isSimple()) {
		var pos = this.pos;
		var pos2 = new Pos(pos);
		this.angle == 0
			? (pos2.x = this.pos.x + 1)
			: (pos2.y = this.pos.y + 1);
		var mnt = Item.getSimpleMount(pos);
		var mnt2 = Item.getSimpleMount(pos2);
		var extra = [
			{type:5, pos: new Pos({x:pos.x+1, y:pos.y+1, z:pos.z})},
			{type:5, pos: new Pos({x:pos2.x, y:pos2.y, z:pos2.z})},
		];
		items = mnt.concat(mnt2.concat(extra));
	} else
		items = Item.getSimpleMount(this.pos);

	var mount = new Mount();
	items.forEach(function (el) { mount.add(el.pos, el.type)});
	return mount;
};

Item.prototype.width = function () {
	return this.isSimple() ? 50 :
		(this.angle == 0 ? 100 : 50);
};

Item.prototype.height = function () {
	return this.isSimple() ? 50 :
		(this.angle == 0 ? 50 : 100);
};

Item.prototype.dim = function () {
	return {w:this.width()/ 50, h:this.height()/50};
};


Item.create = function(obj) {
    return new Item(obj.pos, obj.type, obj.color || 'blue', obj.angle || 0);
};


