import { Router } from "express";
import studentCtrl from "../controllers/student.controller.js"

const route = Router();

route.get('/', studentCtrl.listar);
route.post('/', studentCtrl.crear);
route.get('/:id', studentCtrl.listarPorId);
route.delete('/:id', studentCtrl.eliminar);
route.put('/:id', studentCtrl.actualizar);

export default route;
