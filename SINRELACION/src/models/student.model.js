import mongoose from "mongoose";
const { Schema, model } = mongoose;

const studentSchema = new Schema({
    name: String,
    school: {
        type: Schema.Types.ObjectId,
        ref: "school",
    },
    marks: [],
});

export const studentModel = model("student", studentSchema);