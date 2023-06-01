const DB = require('../utils/DB');

class Restaurant {
    static collection = 'restaurants';

    name;
    location;
    foodType;
    availableSeats;
    locationSeats;

    constructor(name, location, foodType, availableSeats, locationSeats) {
        this.name = name;
        this.location = location;
        this.foodType = foodType;
        this.availableSeats = availableSeats;
        this.locationSeats = locationSeats;
    }

    static async FindAllRestaurants() {
        return await new DB().FindAll(Restaurant.collection);
    }

    static async FindById(id) {
        return await new DB().FindByID(Restaurant.collection, id);
    }

    async InsertOne() {
        return await new DB().Insert(Restaurant.collection, this);
    }

    static async FindRestaurantsForUser(location, foodType, diners) {
        return await new DB().FindRestaurantsByInputs(Restaurant.collection, location, foodType, diners);
    }
}


module.exports = Restaurant;