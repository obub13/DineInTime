const database = 'DineInTime';

// The current database to use.
use(database);

// Create the restaurants collection
db.createCollection("restaurants");

// Insert example documents into the restaurants collection
db.restaurants.insertMany([
  {
    name: "Sakura Sushi",
    location: "Tel Aviv",
    foodType: "Asian"
  },
  {
    name: "Cafe Ne'eman",
    location: "Jerusalem",
    foodType: "Cafe"
  },
  {
    name: "La Piazza",
    location: "Haifa",
    foodType: "Italian"
  },
  {
    name: "Taqueria",
    location: "Tel Aviv",
    foodType: "Mexican"
  },
  {
    name: "The Dancing Camel",
    location: "Tel Aviv",
    foodType: "Pub"
  }
]);