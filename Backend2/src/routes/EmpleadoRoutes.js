import { Router } from "express";
import empleadoCtrl from "../controllers/EmpleadoController.js";
import { ValidFields } from "../middleware/Validfields.js";
import { check } from "express-validator";
import { seedDb } from "../../seed/SeedDb.js";

const route = Router();

// seed poblar base de datos
route.get("/seed", seedDb)

route.get("/", empleadoCtrl.listar);
route.get("/:id", empleadoCtrl.listById);

route.post(
    "/",

    [
        check("nombres", "el campo nombre es obligatorio ")
        .notEmpty()
        .isLength({ min: 4, max: 50 }),
        check("apellidos").optional().isLength({ min: 4, max: 50 }),
        check("correo").isEmail(),
        check("edad", "el campo edad es obligatorio ").notEmpty(),
        check("salario", "el campo salario es obligatorio ").notEmpty(),
        check("cargo", "el campo cargo es obligatorio ").notEmpty(),
    ],
    ValidFields,
    empleadoCtrl.guardar
);

route.put("/:id", empleadoCtrl.actualizar);
route.delete("/:id", empleadoCtrl.eliminar);



export default route;