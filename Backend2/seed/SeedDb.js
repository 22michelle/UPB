import { response } from "../src/helpers/Response.js";
import { empleadoModel } from "../src/models/EmpleadoModel.js";
import { data } from "./data.js";

export const seedDb = async(req, res) => {
    try {
        await empleadoModel.deleteMany();
        const empleados = await empleadoModel.create(data);
        response(res, 201, true, empleados, "Seed ejecutando");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};