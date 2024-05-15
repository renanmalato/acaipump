const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    unity: {type: Number, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    product_location: {type: String, required: true},
    product_calories: {type: String, required: true},
    product_protein: {type: String, required: true},
    product_carbs: {type: String, required: true},
    product_addedsugar: {type: String, required: true},
    product_vitamins: {type: String, required: true}


}, {timestamps: true});

module.exports = mongoose.model("Products", ProductSchema)