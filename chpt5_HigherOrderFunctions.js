/* Eloquent Javascript
  Chpt. 5: Higher Order Functions
  exercises
*/

// Flattening
/* combine an array of arrays into a single array using
  reduce and concat methods */

var arrays = [[1,2,3], [4,5], [6]];

console.log(arrays.reduce(function(a,b){
	return a.concat(b);
}));

// Mother-Child Age Difference
/* use average function and byName object defined earlier
  to compute the average age difference between mothers and
  their children */

function average(array){
	function plus(a,b){ return a+b; }

	return array.reduce(plus)/array.length;
}

var byName = {};
ancestry.forEach(function(person){
	byName[person.name] = person;
});

function momAgeAtBirth(p) { return p.born - byName[p.mother].born; }

var ageDiffs = [];

ancestry.forEach(function(person){
    if (person.mother in byName) {
      var diff = momAgeAtBirth(person);
      ageDiffs.push(diff);
    }
});

console.log(average(ageDiffs));

// Historical Life Expectancy
/* compute average life expectancies of the ancestry data
  set by century */

function average(array){
	function(plus(a,b){ return a+b; });
	return array.reduce(plus)/array.length;
}

var centuryLifeExp = {}

function age(p) { return p.died - p.born; }

function century(person){
	return Math.ceil(person.died / 100);
}

ancestry.forEach(function(person){
	if (centuryLifeExp[century(person)]){
		centuryLifeExp[century(person)].push(age(person));
	}

	else {
		centuryLifeExp[century(person)] = [age(person)];
	}
});

for (time in centuryLifeExp){
  console.log(time + ': ' + average(centuryLifeExp[time]));
}

/* bonus points: write function groupBy that abstracts the
   grouping operation. make it do all of the above in one
   function */

function groupBy(arr, groupingFunc){
	var endObj = {};

	arr.forEach(function(element){
		if (endObj[groupingFunc(p)]){
			endObj[groupingFunc(p)].push(age(element));
		}
		else {
			endObj[groupingFunc(p)] = [age(element)];
		}
	});

	return endObj;
}

var centuryLifeExp = (groupBy(ancestry, century));

for (time in centuryLifeExp) {
  console.log(time + ': ' + average(centuryLifeExp[time]));
}

// Every and Then Some
/* write two functions, every and some. every should return
  boolean if every element in the array matches predicate 
  function and some should return true if any element matches
  predicate function */

function every(arr, test){
	var end = true;
	arr.forEach(function(element){
		if (test(element) !== true) {
			end = false;
		}
	})
	return end;
}

function some(arr, test){
	var end = false;
	arr.forEach(function(element){
		if (test(element) === true) {
			end = true;		}
	})
	return end;
}