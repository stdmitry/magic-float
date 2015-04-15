/**
 * Created by dmitry on 3/31/15.
 */
var Mount = function () {
	this.map = {};
};

Mount.getTypeFlag = function (type) {
	return 1 >> type - 1;
};

Mount.count = function (el) {
	var types = el.types;
	return types.length - (types.indexOf(5) == -1 ? 0 : 1);
};

Mount.types = function (el) {
    var types = el.types;
    var index = types.indexOf(5);
    if (index != -1)
        types.splice(index, 1);
    return types.sort();
};

Mount.shimsCnt = function (el) {
    var types = Mount.types(el);
    var max = Math.max.apply(null, types);
    var min = Math.min.apply(null, types);
    return max - min - types.length + 1;
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

Mount.prototype.forEach = function (callback) {
	$.each(this.map, function (i, el) {
		callback(el);
	});
};

Mount.prototype.clear = function () {
	this.map = {};
};