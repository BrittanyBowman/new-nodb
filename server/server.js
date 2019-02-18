const favesController= require('./Controllers/favoritesController')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3002;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/faves', favesController.getFavorites);

app.post('/api/faves', favesController.addToFavorites);

app.delete('/api/faves/:id', favesController.deleteFavorite);

// app.put('/api/faves/:id', favesController.updateTags) WTF DID I DO???????????????

// TODO: Add PUT/PATCH endpoint that accepts an ID in the parameter 

app.listen(port, () => console.log(`Listening on port ${port}`));