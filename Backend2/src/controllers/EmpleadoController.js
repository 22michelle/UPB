import { response } from "../helpers/Response.js";
import { empleadoModel } from "../models/EmpleadoModel.js";

const empleadoCtrl = {};

// listar a todos los empleados
empleadoCtrl.listar = async(req, res) => {
    try {
        // const empleados = await empleadoModel.find();
        // response(res, 200, true, empleados, "Lista de empleados");

        // const limit = paraseInt(req.query.limit) || 10;
        // const page = paraseInt(req.query.page) || 1;
        const options = {
            limit: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,

        };

        const empleados = await empleadoModel.paginate({}, options);
        response(res, 200, true, empleados, "Lista de empleados");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

// listar empleado por id
empleadoCtrl.listById = async(req, res) => {
    try {
        const { id } = req.params;
        const empleado = await empleadoModel.findById({ _id: id });
        if (!empleado) {
            return response(res, 404, false, "", "Registro no encontrado");
        }
        response(res, 200, true, empleado, "Empleado encontrado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

// guardar empleado
empleadoCtrl.guardar = async(req, res) => {
    try {
        const { correo } = req.body;
        const empleado = await empleadoModel.findOne({ correo });
        if (empleado) {
            return response(
                res,
                400,
                false,
                "",
                "El correo " + correo + " ya fue registrado con otros datos"
            );
        }

        const newEmpleado = await empleadoModel.create(req.body);
        // const newEmpleado = new empleadoModel({
        //     nombres,
        //     apellidos,
        //     correo,
        //     salario,
        //     edad,
        //     cargo,
        // });

        // await newEmpleado.save();
        response(res, 201, true, newEmpleado, "Empleado creado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

// actualizar empleado
empleadoCtrl.actualizar = async(req, res) => {
    try {
        const { id } = req.params;
        const { correo } = req.body;
        // await empleadoModel.findByAndUpdate({ _id: id }, req.body)
        const empleado = await empleadoModel.findById(id);
        if (!empleado) {
            return response(res, 404, false, "", "Registro no encontrado");
        }

        if (empleado.correo !== correo) {
            const empleadoCorreo = await empleadoModel.findOne({ correo });
            if (empleadoCorreo) {
                return response(
                    res,
                    400,
                    false,
                    "",
                    "El correo " + correo + " ya fue registrado con otros datos"
                );
            }
        }
        await empleado.updateOne(req.body);

        response(res, 200, true, empleado, "Registro actualizado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

// eliminar empleado
empleadoCtrl.eliminar = async(req, res) => {
    try {
        const { id } = req.params;
        const empleado = await empleadoModel.findById({ _id: id });
        if (!empleado) {
            return response(res, 404, false, "", "Registro no encontrado");
        }

        await empleado.deleteOne();

        response(res, 200, true, empleado, "Empleado eliminado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

export default empleadoCtrl;