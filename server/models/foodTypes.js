const DB = require('../utils/DB');

class FoodType {
    static collection = 'foodTypes';

    name;

    constructor(name) {
        this.name = name;
    }

    static async FindAllFoodTypes() {
        return await new DB().FindAll(FoodType.collection);
    }

    static async FindById(id) {
        return await new DB().FindByID(FoodType.collection, id);
    }

    async InsertOne(){
        return await new DB().Insert(FoodType.collection, this);
    }

}


module.exports = FoodType;