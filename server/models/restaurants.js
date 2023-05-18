const DB = require('../utils/DB');

class Restaurant {
    static collection = 'restaurants';

    name;
    location;
    foodType;

    constructor(name, location, foodType) {
        this.name = name;
        this.location = location;
        this.foodType = foodType;
    }

    static async FindAllRestaurants() {
        return await new DB().FindAll(Restaurant.collection);
    }

    static async FindById(id) {
        return await new DB().FindByID(Restaurant.collection, id);
    }

    async InsertOne(){
        return await new DB().Insert(Restaurant.collection, this);

    }
}


module.exports = Restaurant;