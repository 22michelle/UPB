import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

const empleadosSchema = new Schema({
    nombres: {
        type: String,
        required: [, "El campo nombre es requerido"],
    },
    apellidos: {
        type: String,
        default: "",
    },
    correo: {
        type: String,
        required: [, "El campo correo es requerido"],
    },
    edad: {
        type: Number,
        required: [, "El campo edad es requerido"],
    },
    salario: {
        type: Number,
        required: [, "El campo salario es requerido"],
    },
    cargo: {
        type: String,
        required: [, "El campo cargo es requerido"],
    },
}, {
    timestamps: true,
});

empleadosSchema.plugin(mongoosePaginate);


export const empleadoModel = model("empleado", empleadosSchema);