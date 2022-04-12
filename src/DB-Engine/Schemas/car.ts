import mongoose from 'mongoose';


/* NEEDS TYPING */

const { Schema } = mongoose;

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

export const Car = mongoose.model('Car', carsSchema, 'cars');
