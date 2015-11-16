/* Eloquent Javascript
   Chpt. 6: The Secret Life of Objects
   exercises
*/

// A Vector Type
/* Write a constructor Vector that represents a vector with x
  and y parameters.
  Give it two methods, plus and minus, that compute the sum
  or difference of two vectors.
  Add a getter property length that computes the length of
  the vector. */

function Vector(x,y){
	this.x = x;
	this.y = y;
}

Vector.prototype.plus = function(newVector){
	var newX = this.x + newVector.x;
	var newY = this.y + newVector.y;

	return new Vector(newX, newY);
}

Vector.prototype.minus = function(newVector){
	var newX = this.x - newVector.x;
	var newY = this.y - newVector.y;

	return new Vector(newX, newY);
}

// reminder: a^2 + b^2 = c^2

Object.defineProperty(Vector.prototype, "length", {
	get: function() { return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)); }
}); 

// Another Cell
/* Write a new cell type called StretchCell(inner, width, height)
  that wraps another cell and makes sure the resulting
  cell has at least the given width and height */

function StretchCell(inner, width, height){
	this.inner = inner;
	this.width = width;
	this.height = height;
}

StretchCell.prototype.minWidth = function(){
	return Math.max(this.inner.minWidth(), this.width);
}

StretchCell.prototype.minHeight = function(){
	return Math.max(this.inner.minHeight(), this.height);
}

StretchCell.prototype.draw = function(){
	return this.inner.draw(width, height);
}

// prototype methods written with help
// from annotated eloquent javascript


// Sequence Interface
/* create an Interface object, then create function
  logFive that takes an Interface object and logs its
  first 5 elements or all it elements (whichever is 
  less).
  Also create two types of interface objects: ArraySeq
  and RangeSeq */

function Interface(input) {
  this.input = input;
}

var logFive = function(interface){
  var input = interface.input;
  for (var i=0; i<Math.min(5, input.length); i++){
    console.log(input[i]);
  }
}
