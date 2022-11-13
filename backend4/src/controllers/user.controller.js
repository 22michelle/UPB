import { encryptPassword } from "../helpers/encryptPassword.js";
import { response } from "../helpers/Response.js";
import { userModel } from "../models/user.model.js";

const userCtrl = {};

userCtrl.register = async(req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return response(
                res,
                409,
                false,
                "",
                "El email ya existe en otro registro"
            );
        }

        const passwordEncrypt = encryptPassword(password);

        const newUser = new userModel({ email, password, name });

        // await newUser.save();

        response(res, 201, true, newUser, "Usuario creado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

export default userCtrl;