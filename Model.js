/**
 * Created by dmitry on 10.03.15.
 */
var Model = function() {
    this.blocks = {};
    var model = this;
    this.init = function (items) {
        items.forEach(function(el) {
            model.addItem(el);
        });
    };
    this.addItem = function(item) {
        if (!model.blocks[item.y])
            model.blocks[item.y] = {};

        model.blocks[item.y][item.x] = item;
    };

    this.canAdd = function(x ,y, type) {
        return (!model.blocks[y] || !model.blocks[y][x]);
    };
};