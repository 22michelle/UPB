import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schoolSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
});

export const schoolModel = model("school", schoolSchema);