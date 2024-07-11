const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/recipebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post('/recipes', async (request, response) => {
  const newRecipe = new Recipe(request.body);
  await newRecipe.save();
  response.json(newRecipe);
});

app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedRecipe);
  });

  app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findById(id);
    res.json(updatedRecipe);
  });
  
  // Delete a recipe by ID
  app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.json({ message: 'Recipe deleted successfully' });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




// create an angular app
// mkdir backend
// cd backend


// npm init -y
// npm install express mongoose body-parser cors


// server.js file
// node server.js in terminal 
// hosting in localhost3000


// Connect Angular Frontend to the Backend

// app -module undayilla - so googled
//  ng new recipe-book  --no-standalone



// https://www.etsy.com/in-en/listing/1663008489/digital-recipe-book-goodnotes-goodnotes?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=recipe+book&ref=sc_gallery-1-3&pro=1&dd=1&plkey=9ba3a72ae3a34f8f91a01ff5834eec526e93ee09%3A1663008489


// https://stackoverflow.com/questions/77454741/why-doesnt-app-module-exist-in-angular-17 - ng version




// add notes along with direction to cook


