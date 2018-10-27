mongoose = require('mongoose');
Schema = require('mongoose').Schema;

FoodSchema = new Schema({
    name: String,
    calories: Number,
    image: String,
    quantity: Number
});

Food = mongoose.model('foods', FoodSchema);

module.exports = Food;