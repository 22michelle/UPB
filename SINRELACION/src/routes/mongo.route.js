import { Router } from "express";
import mongoCtrl from "../controllers/mongo.controller.js";

const route = Router();

route.get('/', mongoCtrl.listar);
route.post('/', mongoCtrl.crear);
route.get('/:id', mongoCtrl.listarPorId);
route.delete('/:id', mongoCtrl.eliminar);
route.put('/:id', mongoCtrl.actualizar);

export default route;
