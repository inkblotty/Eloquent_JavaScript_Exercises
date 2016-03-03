/* Eloquent JavaScript
	Chpt. 8: Bugs & Error Handling
	exercises
*/

// RETRY

function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a,b);
  }
  catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a,b); // way without recursion?
    }
    else {
      return "Error: " + e;
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64

// THE LOCKED BOX

function withBoxUnlocked(body) {
  if (box.locked) { box.unlock(); }
  try {
  	body();
  }
  finally {
  	box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true