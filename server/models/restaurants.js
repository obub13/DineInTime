const DB = require('../utils/DB');

class Restaurant {
    static collection = 'restaurants';

    email;
    phone;
    name;
    location;
    foodType;
    image;
    availableSeats;
    locationSeats;
    password;
    verify;
    approved=false;
    orders=[];

    constructor(email, phone, name, location, address, foodType, image, availableSeats, locationSeats, password, verify) {
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.location = location;
        this.address = address;
        this.foodType = foodType;
        this.image = image;
        this.availableSeats = availableSeats;
        this.locationSeats = locationSeats;
        this.password = password;
        this.verify = verify
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
    
    static async FindByEmail(email) {
        return await new DB().FindEmail(Restaurant.collection, email);
    }

    static async FindRestaurantsForUser(location, foodType, diners) {
        return await new DB().FindRestaurantsByInputs(Restaurant.collection, location, foodType, diners);
    }

    static async UpdateSeats(id, seatType, numDiners) {
        return await new DB().UpdateSeatsByReservation(Restaurant.collection, id, seatType, numDiners);
    }

    static async DeleteRestaurant(id){
        return await new DB().DeleteById(Restaurant.collection,id)
    }

    static async AddOrder(id, userId, seatType, diners){
        return await new DB().UpdateOrder(Restaurant.collection, id, userId, seatType, diners)
    }

    static async ChangeApproved(id, email, name){
        return await new DB().ApprovedRestaurant(Restaurant.collection, id, email, name);
    }

    static async AddItem(id, name, price, image) {
        return await new DB().AddMenuItem(Restaurant.collection, id, name, price, image);
    }

    static async DeleteItem(id, itemId) {
        return await new DB().DeleteMenuItem(Restaurant.collection, id, itemId);
    }
    
    static async EditMenu(id, itemId, name, price, image) {
        return await new DB().EditMenuItem(Restaurant.collection, id, itemId, name, price, image);
    }
}


module.exports = Restaurant;