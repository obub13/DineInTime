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
    foodType: "Asian",
    availableSeats: 35, 
    locationSeats: {
      inside: 20,
      outside: 10,
      bar: 5
    }
  },
  {
    name: "Cafe Ne'eman",
    location: "Jerusalem",
    foodType: "Cafe",
    availableSeats: 23,
    locationSeats: {
      inside: 15,
      outside: 0,
      bar: 8
    }
  },
  {
    name: "La Piazza",
    location: "Haifa",
    foodType: "Italian",
    availableSeats:  32,
    locationSeats: {
      inside: 0,
      outside: 20,
      bar: 12
    }
  },
  {
    name: "Taqueria",
    location: "Tel Aviv",
    foodType: "Mexican",
    availableSeats: 15,
    locationSeats: {
      inside: 10,
      outside: 5,
      bar: 0
    }
  },
  {
    name: "The Dancing Camel",
    location: "Tel Aviv",
    foodType: "Pub",
    availableSeats: 14,
    locationSeats: {
      inside: 8,
      outside: 2,
      bar: 4
    }
  }
]);