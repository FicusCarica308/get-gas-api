import mongoose from 'mongoose';


/* NEEDS TYPING */

const { Schema } = mongoose;

const carsSchema = new Schema ({
    make: String,
    model: String,
    year: Number,
    cylinders: Number,
    city_mpg: Number,
    highway_mpg: Number,
    combined_mpg: Number,
});

export const Car = mongoose.model('Car', carsSchema, 'cars');
