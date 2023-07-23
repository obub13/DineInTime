const Restaurant = require('../models/restaurants');
const restaurantsRoute = require('express').Router();

restaurantsRoute.get('/', async (req, res) => {
    try {
        let data = await Restaurant.FindAllRestaurants();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

restaurantsRoute.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let data = await Restaurant.FindById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

restaurantsRoute.get('/email/:email', async (req, res) => {
    try {
        let { email } = req.params;
        let data = await Restaurant.FindByEmail(email);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

restaurantsRoute.post('/add', async (req, res) => {
    try {
        let { email, phone, name, location, address, foodType, image, availableSeats, locationSeats: { inside, outside, bar }, password, verify, approved } = req.body;
        let data = await new Restaurant(email, phone, name, location, address, foodType, image, availableSeats, { inside, outside, bar }, password, verify, approved).InsertOne();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

restaurantsRoute.post('/find', async (req, res) => {
    try {
        let { location, foodType, diners } = req.body;
        let data = await Restaurant.FindRestaurantsForUser(location, foodType, diners);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

restaurantsRoute.post('/orders/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { userId, seatType, diners } = req.body;
        let data = await Restaurant.AddOrder(id, userId, seatType, diners);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

restaurantsRoute.post('/:id/menu', async (req, res) => {
    try {
        let { id } = req.params;
        let { name, price, image } = req.body;
        let data = await Restaurant.AddItem(id, name, price, image);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.put('/seats', async (req, res) => {
    try {
      let { id, seatType, numDiners } = req.body;
    //   console.log(req.body);
      let data = await Restaurant.UpdateSeats(id, seatType, numDiners);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

restaurantsRoute.put('/approved/:id', async(req,res)=>{
    try {
        let { id } = req.params;
        let {email, name} = req.body;
        let data = await Restaurant.ChangeApproved(id, email, name);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

restaurantsRoute.put('/edit/:id/menu', async (req, res) => {
    try {
        let { id } = req.params;
        let { itemId, name, price, image } = req.body;
        console.log(id, itemId, name, price, image);
        let data = await Restaurant.EditMenu(id, itemId, name, price, image);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error });
    }
});

restaurantsRoute.delete('/delete/:id', async (req, res) =>{
    try {
        let { id } = req.params;
        let data = await Restaurant.DeleteRestaurant(id);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

restaurantsRoute.delete('/menu/:id/delete', async (req, res) =>{
    try {
        let { id } = req.params;
        let { itemId } = req.body;
        let data = await Restaurant.DeleteItem(id, itemId);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});


module.exports = restaurantsRoute;