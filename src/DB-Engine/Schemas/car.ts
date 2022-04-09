import mongoose, { Schema } from 'mongoose';

const schema: any = mongoose.Schema;

const carsSchema = new schema ({

    make: String,
    model: String,
    year: Number,
    displacment: Number,
    cylinderCount: Number,
    fuelSpecifications: {
        cityMPG: Number,
        highwayMPG: Number,
        combinedMPG: Number,
        octaneRating: Number,
    }
});

export const Car = mongoose.model('Car', carsSchema, 'cars');
