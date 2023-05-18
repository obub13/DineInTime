const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5500;

const server = express();
server.use(cors());
server.use(express.json());

server.use('/api/users', require('./routes/usersRoute'));

server.use('/api/foodTypes', require('./routes/foodTypesRoute'));

server.use('/api/restaurants', require('./routes/restaurantsRoute'));

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));