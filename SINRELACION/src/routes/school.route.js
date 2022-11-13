import { Router } from "express";
import schoolCtrl  from "../controllers/school.controller.js";

const route = Router();

route.get('/', schoolCtrl.listar);
route.post('/', schoolCtrl.crear);
route.get('/:id', schoolCtrl.listarPorId);
route.delete('/:id', schoolCtrl.eliminar);
route.put('/:id', schoolCtrl.actualizar);

export default route;
