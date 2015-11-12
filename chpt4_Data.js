/* Eloquent Javascript
  Chpt. 4: Data
  exercises
*/

// The Sum of a Range
/* write a function range that creates an array of all numbers
  within the given range (end inclusive); write another function
  sum that take an array of numbers and returns their sum */

function range(start, end){
	var endArr = [];
	for (var i=start; i<=end; i++) { endArr.push(i); }
    return endArr;
}

function sum(arr){
	return arr.reduce(a,b){ return a+b; }
}

/* now rewrite range so that it can take a 3rd argument that
  indicates a "step" value for increments between values.
  Make sure it works for negative step amounts
*/

function range(start, end, incr){
  var endArr = [];
  if (incr === undefined) { incr = 1; }
  if (incr > 0) {
   for (var i=start; i<=end; i+=incr) { endArr.push(i); }
  }
  else {
  	for (var i=start; i>=end; i+=incr) { endArr.push(i); }
  }
  return endArr;
}

// Reversing an Array
/* write two functions without using the standard reverse method:
  reverArray (returns a new reversed array) and reverseArrayInPlace
  (returns the same array with all elements reversed) */

function reverseArray(arr){
	var newArr = [];
	arr.forEach(function(element){ newArr.unshift(element); });
    return newArr;
}

function reverseArrayInPlace(arr){
  for (var i=0; i<Math.floor(arr.length/2); i++){
	var item1 = arr[i];
	var item2 = arr[arr.length-1-i];

	arr[i] = item2;
    arr[arr.length-1-i] = item1;
  }
  return arr;
}

// A List
/* Write a function arrayToList that builds a list from an
  array.
  Also write listToArray that builds an array from a
  list.
  Write helper functions:
  - prepend (returns a new list with new element at beginning)
  - nth (returns element at the given position in the list; recursive) */

function arrayToList(arr){
  var endList = {value: arr[arr.length-1], rest:null};

  for (var i=arr.length-2; i>=0; i--){
  	endList = prepend(arr[i], endList);
  }

  return endList;
}

function listToArray(lst){
  var newArr = [];

  for (var node=list; node; node=node.rest){ // method suggested by book
    newArr.push(nth(lst, node.value-1)); // more research needed into node
  }

  return newArr;
}

function prepend(element, lst){
  return { value:element, rest: lst };
}

function nth(lst, indx){
  if (lst === null) { return undefined; }
  else if (indx === 0) { return lst.value; }
  else {
  	return nth(lst.rest, indx-1);
  }
}

// Deep Comparison
/* Write a function deepEqual that takes two values and returns
  true only if they are the same value or are objects with the 
  same properties whose values are deepEqual (recursive) */

function deepEqual(thing1, thing2){
	if (typeof thing1 !== typeof thing2) { return false; }
	else if ( thing1 === null || thing2 === null) { return false; }
	else if (typeof thing1 === "object"){
		for (prop in thing1) {
			return deepEqual(thing1[prop], thing2[prop]);
		}
	}
	else if (thing1 === thing2) { return true; }
} // more succinct way to do this?