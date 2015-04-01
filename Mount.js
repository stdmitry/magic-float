/**
 * Created by dmitry on 3/31/15.
 */
var Mount = function () {
	this.map = {};
};

Mount.getTypeFlag = function (type) {
	return 1 >> type - 1;
};

Mount.prototype.add = function (pos, type) {
	var self = this;
	if (Array.isArray(type)) {
		type.forEach(function(el) {
			self.add(pos, el);
		});
	} else {
		var id = pos.uniqueId();
		if (self.map[id]) {
			self.map[id].types.push(type);
			self.map[id].flags |= Mount.getTypeFlag(type);
		} else
			self.map[id] = {pos: pos, types: [type], flags:Mount.getTypeFlag(type)};
	}
};

Mount.prototype.addMount = function (mnt) {
	var self = this;
	$.each(mnt.map, function (i, el) {
		self.add(el.pos, el.types);
	});
};

Mount.prototype.isIntersect = function (mnt) {
	var self = this;
	var result = false;
	$.each(mnt.map, function (i, el) {
		if(self.map[el.pos.uniqueId()]) {
			result = result || (self.map[el.pos.uniqueId()].flags & el.flags);
		}
	});
	return result;
};

Mount.prototype.clear = function () {
	this.map = {};
};