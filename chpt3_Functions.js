/* Eloquent Javascript
  Chpt. 3: Functions
  exercises
*/

// Minimum
/* write a function that takes the minimum of two numbers
  just like Math.min */

function min(num1,num2){
	return num1 > num2 ? num2 : num1;
}

// Recursion
/* define a recursive function isEven that accepts a number
  and returns a boolean */

function isEven(num){
	num = Math.abs(num);

	if (num === 0) { return true; }
	else if (num === 1) { return false; }
	else {
		return isEven(num-2);
	}
}

// Bean Counting
/* write a function countBs that takes a string and returns
  the number of uppercase Bs. also write a function countChar
  that does the same with a given character */

function countBs(str){
	var total = 0;
	str.split('').forEach(function(letter){
		if (letter === "B") { total++; }
	});
	return total;
}

function countChar(str, ch){
	var total = 0;
	str.split('').forEach(function(letter){
		if (letter === ch) { total++; }
	});
	return total;
}