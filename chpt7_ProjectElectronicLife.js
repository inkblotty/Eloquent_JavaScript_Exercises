/* Eloquent Javascript
  Chpt. 7: Project: Electronic Life
*/

function Vector(x, y) {
	this.x = x;
	this.y = y;
};

Vector.prototype.plus = function(other) {
	return new Vector(this.x + other.x, this.y + other.y);
};

/* GRID */
function Grid(width, height) {
	this.space = new Array(width * height);
	this.width = width;
	this.height = height;
};

Grid.prototype.isInside = function(vector) {
	// returns boolean if the vector lies within the
	// boundaries of the board
	return vector.x >= 0 && vector.x < this.width &&
				 vector.y >= 0 && vector.y < this.height;
};

// vector (x, y) found at position grid[x + (y*width)]
Grid.prototype.get = function(vector) {
	// tells the value at a specific point
	return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function(vector, value) {
	// changes the value at a specific point in the grid
	this.space[vector.x + this.width * vector.y] = value;
}

/* CREATURES */
var directions = {
	"n": new Vector(0, -1),
	"ne": new Vector(1, -1),
	"e": new Vector(1, 0),
	"se": new Vector(1, 1),
	"s": new Vector(0, 1),
	"sw": new Vector(-1, 1),
	"w": new Vector(-1, 0),
	"nw": new Vector(-1, -1)
};

function randomElement(array) {
	// chooses a random element in the array
	return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
	// chooses random direction to move
	this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
	// if the space in that direction isn't open
	if (view.look(this.direction) != " ") {
		// then find a different direction
		// why do we default to south? -- to prevent 'null' when surrounded
		this.direction = view.find(" ") || "s";
	};
	return {type: "move", direction: this.direction};
};

/* WORLD */
function elementFromChar(legend, ch) {
	// returns meaning (i.e, 'critter', 'wall') for
	// a character based on the legend
	if (ch == " ") {
		return null;
	}
	// legend[ch] returns a constructor function
	var element = new legend[ch]();
	element.originChar = ch;
	return element;
};

function World(map, legend) {
	// map is array of values across (width) and down (height)
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;

	map.forEach(function(line, y) {
		// takes each value in the map and ties it
		// to the corresponding vector in the grid
		for (var x = 0; x < line.length; x++) {
			grid.set(new Vector(x, y), 
				elementFromChar(legend, line[x]));
		};
	});
};

function charFromElement(element) {
	// just the reverse of charFromElement
	// useful for printing/logging
	if (element == null) {
		return " ";
	}
	else {
		return element.originChar;
	};
};

World.prototype.toString = function() {
	// prints out the world grid
	var output = "";
	for (var y = 0; y < this.grid.height; y++) {
		for (var x = 0; x < this.grid.width; x++) {
			var element = this.grid.get(new Vector(x, y));
			output += charFromElement(element);
		}
		output += "\n";
	}
	return output;
};

// wall intentionally has no act object --
// it just takes up space
function Wall() {}


/* NOW CONSTRUCT THE WORLD */
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"
];

var world = new World(plan, {
	'#': Wall,
	'o': BouncingCritter});

//console.log(world.toString());

/* TURNS */
// makes sure any creatures that have taken
// a turn don't get acted on again during loop
World.prototype.turn = function() {
	var acted = [];
	this.grid.forEach(function(critter, vector) {
		// looks for anything with an 'act' method
		if (critter.act && acted.indexOf(critter) == -1) {
			acted.push(critter);
			this.letAct(critter, vector);
		}
	}, this); // binds to the World object even in a diff scope
};

// actual movement logic
World.prototype.letAct = function(critter, vector) {
	// takes in a view and returns an action of some kind
	var action = critter.act(new View(this, vector));
	// if action is "move" and it has a valid direction
	if (action && action.type == "move") {
		// if the destination space is empty
		var dest = this.checkDestination(action, vector);
		if (dest && this.grid.get(dest) == null) {
			// old space is now null
			this.grid.set(vector, null);
			// new space now has the critter
			this.grid.set(dest, critter);
		}
	}
};

World.prototype.checkDestination = function(action, vector) {
	if (directions.hasOwnProperty(action.direction)) {
		var dest = vector.plus(directions[action.direction]);
		if (this.grid.isInside(dest)) {
			return dest;
		}
	}
};

/* VIEW */
// looks around the creatures
function View(world, vector) {
	this.world = world;
	this.vector = vector;
};

View.prototype.look = function(dir) {
	// adds/subtracts from current position
	// based on "ne", "s", etc. values in directions obj
	// to see what's in the direction we want
	var target = this.vector.plus(directions[dir]);
	if (this.world.grid.isInside(target)) {
		return charFromElement(this.world.grid.get(target));
	}
	else {
		// it's the outer wall!
		return "#";
	}
};

View.prototype.findAll = function(ch) {
	// finds all the spaces that match the character
	// mostly used to find available spaces
	var found = [];
	for (var dir in directions) {
		if (this.look(dir) == ch) {
			found.push(dir);
		}
	}
	return found;
};

View.prototype.find = function(ch) {
	var found = this.findAll(ch);
	if (found.length == 0) { return null; };
	return randomElement(found);
};

/* SET THE WORLD IN MOTION */

// 5 turns
for (var i = 0; i < 5; i++) {
	world.turn();
	console.log(world.toString());
};

// book online has method available
// animateWorld(world) to start the
// process without specifying # of turns

/* MORE LIFE FORMS */
// changes direction of creature based on
// dir ("n", "sw", etc.) and n number of
// clockwise turns (1 == 45deg clockwise;
// -2 == 90deg counterclockwise)
function dirPlus(dir, n) {
	var index = directionNames.indexOf(dir);
	return directionNames[(index + n + 8) % 8];
}

// new type of creature
function WallFollower() {
	this.dir = "s"; // default direction
}

WallFollower.prototype.act = function(view) {
	var start = this.dir;
	if (view.look(dirPlus(this.dir, -3)) != " ") {
		start = this.dir = dirPlus(this.dir, -2);
	}
	while (view.look(this.dir) != " ") {
		// if there's only empty space around,
		// go straight until a wall is found
		this.dir = dirPlus(this.dir, 1);
		if (this.dir == start) break;
	}
	return {type: "move", direction: this.dir};
};

