const mongoose = require('mongoose');
const Schema = mongoose.Schema

/* NEEDS TYPING */

const carsSchema = new Schema ({
    make: String,
    model: String,
    year: Number,
    displacment: Number,
    cylinders: Number,
    fuelSpecifications: {
        cityMPG: Number,
        highwayMPG: Number,
        combinedMPG: Number,
    }
});

module.exports = mongoose.model('Car', carsSchema, 'cars');
