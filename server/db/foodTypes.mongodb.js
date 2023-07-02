const database = 'DineInTime';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection("foodTypes");


db.foodTypes.insertMany([
	{name: "Asian", image: "../assets/Asian.png"},
	{name: "Burgers", image: "../assets/Burgers.png"},
	{name: "Cafe",	image:	"../assets/Cafe.png"},
	{name: "Italian", image:	"../assets/Italian.png"},
	{name: "Pub", image: "../assets/Pub.png"},
	{name: "Fish", image: "../assets/Fish.png"},
	{name: "Meat", image: "../assets/Meat.png"},
	{name: "Vegan",	image:	"../assets/Vegan.png"},
]);

