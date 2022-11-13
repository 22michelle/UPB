import mongoose from "mongoose";
const { Schema, model } = mongoose;

const mongoSchema = new Schema({
  student_name: Number,
  school: {
    school_id: String,
    name: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
  },
  marks: [],
});

export const mongoModel = model("mongo", mongoSchema);
