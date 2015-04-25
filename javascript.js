/* COSC 343 Assignment 2 - Genetic Algorithm. Rory Mearns, ID.3928873, 25/4/2015 */

/* ---- World Variables & Data Structures ---- */
// Timing
var timestep;						// the 'world clock'
var wait;							// how long to wait between timesteps for possible animation

// Drawing
var world_width_cells = 40;			// world width in number of cells 
var world_height_cells = 20;		// world height in number of cells
var block_size = 10;				// how big a 'cell' is in pixels on the screen
var world_width_pixels = world_width_cells*block_size;		// world width in number of pixels 
var world_height_pixels = world_height_cells*block_size;		// world height in number of pixels
var creature_color = "#50B3FA";		// color of creatures: blue
var monster_color = "#19B319";		// color of monsters: green
var strawberry_color = "#ED3E6F";	// color of strawberries: red
var mushroom_color = "#8F6353";		// color of mushrooms: brown


// Data
var strawb_array = new Array(world_width_cells);				// 2D location array, each cell contains a number indicating the quantity of food
var mushroom_array = new Array(world_width_cells);				// 2D location array, each cell contains a number indicating the quantity of food
var num_creatures = 5;											// number of creatures in the world
var creatures_array = new Array(num_creatures);					// 1D array of all the creatures
var creatures_location_array = new Array(world_width_cells);	// 2D array of all the creatures locations
var num_monsters = 5;											// number of monsters in the world
var monsters_array = new Array(num_monsters);					// 1D array of all the monsters
var monsters_location_array = new Array(world_width_cells);		// 2D array of all the monsters locations
var chance_of_strawb = 0.05;									// the chance of any one cell containing a strawberry
var chance_of_mush = 0.05;										// the chance of any one cell containing a mushroom
var max_strawb = 6;												// the highest number of food any one strawberry tile can contain
var start_energy = 5;											// how much energy each creature starts with


/* ---- Canvas Element ---- */
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = world_width_pixels;
canvas.height = world_height_pixels;
document.body.appendChild(canvas);


/* ---- Creatures ---- */
function Creature (locationX, locationY) {

	// States & Variables:
	this.locationX = locationX;
	this.locationY = locationY;
	this.energy_level = start_energy;
	this.actions_list = [];

	// Chromosome:
	this.chromosome = new Array(13);

	// Sensory Functions:
	this.strawb_present = function () {}
	this.mushroom_present = function () {}
	this.nearest_strawb = function () {}
	this.nearest_mushroom = function () {}
	this.nearest_monster = function () {}
	this.nearest_creature = function () {}

	// Actions:
	this.move = function () {}
	this.eat = function () {}	
	this.select_action = function () {}
}


/* ---- Monsters ---- */
function Monster (locationX, locationY) {

	// States:
	this.locationX = locationX;
	this.locationY = locationY;

	// Sensory Functions:
	this.nearest_creature = function () {}

	// Actions:
	this.move = function () {}
	this.select_action = function () {}
}


/* ---- Draw Everything ---- */
var render = function () {

	// draw the strawberry & mushroom map:
	for (var i=0; i<world_width_cells; i++) {
		for (var j=0; j<world_height_cells; j++) {
			var x = i*block_size;
			var y = j*block_size;

			if (strawb_array[i][j]>0) {
				ctx.fillStyle = strawberry_color;
				ctx.fillRect(x, y, block_size, block_size);
			}
			if (mushroom_array[i][j]>0) {
				ctx.fillStyle = mushroom_color;
				ctx.fillRect(x, y, block_size, block_size);
			}
		}
	}

	// draw the creatures on the map:
	for (var i=0; i<world_width_cells; i++) {
		for (var j=0; j<world_height_cells; j++) {
			var x = i*block_size;
			var y = j*block_size;

			if (creatures_location_array[i][j] == 1) {
				ctx.fillStyle = creature_color;
				ctx.fillRect(x, y, block_size, block_size);
			}
		}
	}

	// draw the monsters on the map:
	for (var i=0; i<world_width_cells; i++) {
		for (var j=0; j<world_height_cells; j++) {
			var x = i*block_size;
			var y = j*block_size;

			if (monsters_location_array[i][j] == 1) {
				ctx.fillStyle = monster_color;
				ctx.fillRect(x, y, block_size, block_size);
			}
		}
	}

};


/* ---- Initialise Everything ---- */
var initialise = function () {
	
	// fill strawberry & mushroom array:
	for (var i=0; i<world_width_cells; i++) {
		strawb_array[i] = new Array(world_height_cells);
		mushroom_array[i] = new Array(world_height_cells);

		for (var j=0; j<world_height_cells; j++) {
			var rand = Math.random();

			if (rand<chance_of_strawb) {
				strawb_array[i][j] = Math.floor(Math.random() * max_strawb) + 1;
				mushroom_array[i][j] = 0;
			}
			else if (rand>(1-chance_of_mush)) {
				mushroom_array[i][j] = 1;
				strawb_array[i][j] = 0;
			} else {
				mushroom_array[i][j] = 0;
				strawb_array[i][j] = 0;
			}
		}
	}

	// Create sparse array of monster and creature locations:
	for (var i=0; i<world_width_cells; i++) {
		monsters_location_array[i] = new Array(world_height_cells);
		creatures_location_array[i] = new Array(world_height_cells);
	}

	// fill creatures_array
	for (var i=0; i<num_creatures; i++) {
		// find a random location in the 2D array:
		var x = Math.floor(Math.random() * world_width_cells);
		var y = Math.floor(Math.random() * world_height_cells);

		if (creatures_location_array[x][y] == undefined) {
			creatures_array[i] = new Creature(x,y);
			creatures_location_array[x][y] = 1;
		} else {
			i--;
		}
	}

	// fill monsters_array:
	for (var i=0; i<num_monsters; i++) {
		// find a random location in the 2D array:
		var x = Math.floor(Math.random() * world_width_cells);
		var y = Math.floor(Math.random() * world_height_cells);

		if (monsters_location_array[x][y] == undefined){
			monsters_array[i] = new Monster(x,y);
			monsters_location_array[x][y] = 1;
		} else { 
			i--;
		}
	}

	// Check for any immediate collisions:

};

/* ---- Program Funcitons ---- */
var reset = function () {

};

var main = function () {
	console.log(strawb_array[3][4]);
	render();	
};


/* ---- Running the Program ---- */
reset();
initialise();
main();

/* --------------- Just for my own reference: --------------- */
// If you wanted to get between 1 and 6, you would put:
// Math.floor(Math.random() * 6) + 1;


/* --------------- Objects & Classes in the World --------------- */

// Creatures:
/* The creatures that will evolve. Each creature contains a 'state', 'sense', 'action', 'chromosome'
	state: 	energy_level: decremented by some small value each timestep, if it reaches 0 it's dead
	location:
	sense: 	detect monsters and food in their local neighbourhood
			can tell it things about the current square or it's neighbourhood.
			- strawb_present (bool) indicating the presence/absence of strawberries at current location
			- mushroom_present (bool) indicating the presence/absence of mushrooms at current location
			- nearest_strawb ('n' 'e' 's' 'w') indicating the direction towards the nearst strawb in current neighbourhood
			- nearest_mushroom
			- nearest_monster
			- nearest_creature
	action: - move ('n' 'e' 's' 'w') direction can be random but can also be relative to the directions returned by its senses
				can move 'towards' or 'away_from' the nearst X in its neighbourhood. Decreases energy level.
			- eat will consume food from it's current square (decrement strab_array/mushroom_array by a constant)
				increasing it's energy level by some amount (greater than the energy required to eat). 
				eating a unit of mushroom decreases it's energy to 0 (kills it).
	chromosome:	13 position in the chromosome, first 6 map to the 6 sensory functions:
			1 - action on 'strawb_present'		- eat/ignore
			2 - action on 'mushroom_present'	- eat/ignore
			3 - action on 'nearst_strawb'		- towards/away_from/random/ignore
			4 - action on 'nearest_mushroom'	- towards/away_from/random/ignore
			5 - action on 'nearest_monster'		- towards/away_from/random/ignore
			6 - action on 'nearest_creature'	- towards/away_from/random/ignore
			7 - default action					- random/north/east/south/west
			8-13 specify weights for actions 1-6 to determine what to do if multiple actions are activated.
			*/

// Monsters: Basic 'zombies'. Each monster contains a 'state' (location). Slower than creatures (move once every F timesteps)
//								They move towards the nearest creature, or at random.
//				state: location
//				sense: detect creatures in their local neighbourhood.

// Mushrooms: Poisonous Food

// Strawberries: Edible food



/* --------------- Data Structures of the World --------------- */

// Strawberry Array: strab_array, 2D array, each cell contains a number indicating the quantity of food.
// 			strawberries & mushrooms cannot share the same cell.

// Mushroom Array: mushroom_array, 2D array, each cell contains a number indicating the quantity of food.
// 			strawberries & mushrooms cannot share the same cell.

// Creatures Array: 1D array of all the 'Creature Objects'. 

// Creatures Location Array: 2D array of the location of all the 'Creature Objects'

// Monsters Array: 1D array of all the 'Monster Objects'.

// Monsters Location Array: 2D array of the location of all the 'Monster Objects'

























