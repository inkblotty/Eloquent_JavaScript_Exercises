/* Eloquent JavaScript
	Chpt. 9: Regular Expressions
	exercises
*/

// REGEXP GOLF
verify(/cat|car/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr*op/,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/ferr[^u]/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/[\w]+ious$/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[\.:;,]/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/\w{6,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/.../,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
  });
}

// QUOTING STYLE
var text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(\W)'|'([A-Z])/g, "$1\"$2"));
// → "I'm the cook," he said, "it's my job."