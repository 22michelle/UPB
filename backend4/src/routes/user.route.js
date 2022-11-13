import { Router } from "express";
import userCtrl from "../controllers/user.controller.js";

const route = Router();

route.post('/', userCtrl.register)

export default route;