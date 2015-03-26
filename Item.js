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
}

var Item = function (pos, type) {
	this.type = type || 'block';
    this.pos = new Pos(pos);
};

Item.prototype.uniqueId = function () {
	return this.pos.uniqueId();
};

Item.prototype.getPlaces = function() {
	if (this.type == 'block2x' || this.type == 'block2x90') {
		var pos2 = new Pos(this.pos);
		this.type == 'block2x'
			? (pos2.x = this.pos.x + 1)
			: (pos2.y = this.pos.y + 1);
		return [this.pos, pos2];
	}

	return [this.pos];
};

Item.getSimpleMount = function (pos) {
	return  [
		{type:0x1, pos: new Pos({x:pos.x, y:pos.y, z:pos.z})},
		{type:0x2, pos: new Pos({x:pos.x, y:pos.y + 1, z:pos.z})},
		{type:0x4, pos: new Pos({x:pos.x + 1, y:pos.y + 1, z:pos.z})},
		{type:0x8, pos: new Pos({x:pos.x + 1, y:pos.y, z:pos.z})}
	];
};

Item.prototype.getMounting = function() {
	if (this.type == 'block2x' || this.type == 'block2x90') {
		var pos2 = new Pos(this.pos);
		this.type == 'block2x'
			? (pos2.x = this.pos.x + 1)
			: (pos2.y = this.pos.y + 1);
		var mnt = Item.getSimpleMount(this.pos);
		var mnt2 = Item.getSimpleMount(pos2);
		return mnt.concat(mnt2);
	}
	return Item.getSimpleMount(this.pos);
};

Item.prototype.width = function () {
	return this.type == 'block2x' ? 100 : 50;
};

Item.prototype.height = function () {
	return this.type == 'block2x90' ? 100 : 50;
};

Item.create = function(obj) {
    return new Item(obj.pos, obj.type)
};

