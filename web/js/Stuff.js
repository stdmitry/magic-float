/**
 * Created by dmitry on 3/6/15.
 */
String.prototype.ucfirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}


function Rectangle(x, y, width, height) {
	this.left = x;
	this.right = x + width;;
	this.top = y;
	this.bottom = y + height;
}
