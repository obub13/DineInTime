const database = 'DineInTime';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection("foodTypes");


db.foodTypes.insertMany([
	{name: "Asian"}, 
	{name: "Cafe"},
	{name: "Italian"},  
	{name: "Mexican"}, 
	{name: "Pub"}]);

