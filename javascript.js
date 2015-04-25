/* --------------- Objects & Classes in the World --------------- */

Creatures.prototype = {
	strab_present = function () {}
	mushroom_present = function () {}
	nearest_strawb = function () {}
	nearest_mushroom = function () {}
	nearest_monster = function () {}
	nearest_creature = function () {}
};


Monsters.prototype = {

};

Mushrooms.prototype = {

};

Strawberries.prototype = {

};	

// Creatures:
/* The creatures that will evolve. Each creature contains a 'state', 'sense', 'action', 'chromosome'
	state: 	energy_level: decremented by some small value each timestep, if it reaches 0 it's dead
	location:
	sense: 	detect monsters and food in their local neighbourhood
			can tell it things about the current square or it's neighbourhood.
			- strab_present (bool) indicating the presence/absence of strawberries at current location
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

























