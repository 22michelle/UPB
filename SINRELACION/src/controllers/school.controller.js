import { response } from "../helpers/response.js";
import { schoolModel } from "../models/school.model.js";
import { studentModel } from "../models/student.model.js";

const schoolCtrl = {};

schoolCtrl.listar = async(req, res) => {
    try {
        const registros = await schoolModel.find();
        response(res, 200, true, registros, "Lista de registros");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

schoolCtrl.crear = async(req, res) => {
    try {
        const nuevoRegistros = await schoolModel.create(req.body);
        response(res, 201, true, nuevoRegistros, "Registro creado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

schoolCtrl.listarPorId = async(req, res) => {
    try {
        const { id } = req.params;
        const registro = await schoolModel.findById(id);
        if (!registro) {
            return response(res, 404, false, "", "Registro no encontrado");
        }
        response(res, 201, true, registro, "Registro encontrado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

schoolCtrl.eliminar = async(req, res) => {
    try {
        const { id } = req.params;
        const registro = await schoolModel.findById(id);
        if (!registro) {
            return response(res, 404, false, "", "Registro no encontrado");
        }

        await studentModel.deleteMany({ school: registro._id })
        await registro.deleteOne();
        response(res, 201, true, "", "Registro eliminadoado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

schoolCtrl.actualizar = async(req, res) => {
    try {
        const { id } = req.params;
        const registro = await schoolModel.findById(id);
        if (!registro) {
            return response(res, 404, false, "", "Registro no encontrado");
        }

        await registro.updateOne(req.body);
        response(res, 201, true, "", "Registro actualizado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

export default schoolCtrl;