/* COSC 343 Assignment 2 - Genetic Algorithm. Rory Mearns, ID.3928873, 25/4/2015 */

/* ---- World Variables & Data Structures ---- */
// Timing
var timestep;						// the 'world clock'
var wait;							// how long to wait between timesteps for possible animation

// Drawing
var world_width_cells = 20;			// world width in number of cells 
var world_height_cells = 20;		// world height in number of cells
var block_size = 10;				// how big a 'cell' is in pixels on the screen
var world_width_pixels = world_width_cells*block_size;		// world width in number of pixels 
var world_height_pixels = world_width_cells*block_size;		// world height in number of pixels

// Data
var strab_array = [];				// 2D location array, each cell contains a number indicating the quantity of food
var mushroom_array = [];			// 2D location array, each cell contains a number indicating the quantity of food
var creatures_array = [];			// 1D array of all the creatures
var creatures_location_array = [];	// 2D array of all the creatures locations
var monsters_array = [];			// 1D array of all the monsters
var monsters_location_array = [];	// 2D array of all the monsters locations

/* ---- Canvas Element ---- */
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = world_width_pixels;
canvas.height = world_height_pixels;
document.body.appendChild(canvas);

/* ---- Creatures ---- */
function Creature () {

	// States & Variables:
	this.location = 0;
	this.energy_level = 0;
	this.actions_list = [];

	// Chromosome:
	this.chromosome = [];

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
function Monster () {

	// States:
	this.location = 0;

	// Sensory Functions:
	this.nearest_creature = function () {}

	// Actions:
	this.move = function () {}
	this.select_action = function () {}
}

/* ---- Mushrooms ---- */
//Mushrooms.prototype = {};

/* ---- Strawberries ---- */

/* ---- Draw Everything ---- */
var render = function () {
};

/* ---- Program Funcitons ---- */
var reset = function () {

};

var main = function () {
	console.log("Mic check, one, two...");	
};

/* ---- Running the Program ---- */
reset();
main();

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

























