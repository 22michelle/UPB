import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El campo name es requerido"],
    },
    email: {
        type: String,
        required: [true, "El campo email es requerido"],
    },
    password: {
        type: String,
        required: [true, "El password email es requerido"],
    },
}, {
    timestamps: true,
});

export const userModel = model("user", userSchema);