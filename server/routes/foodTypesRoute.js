const foodType = require('../models/foodTypes');
const foodTypesRoute = require('express').Router();

foodTypesRoute.get('/', async (req, res) => {
    try {
        let data = await foodType.FindAllFoodTypes();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

foodTypesRoute.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await foodType.FindById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

foodTypesRoute.post('/add', async (req, res) => {
    try {
        let { name } = req.body;
        let data = await new foodType(name).InsertOne();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = foodTypesRoute;