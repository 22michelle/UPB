import { subirImageACloudinary, eliminarImagenCloudinary } from "../helpers/cloudinary.action.js";
import { response } from "../helpers/Response.js";
import { postModel } from "../models/postmodel.js";


const postCtrl = {};

postCtrl.listar = async(req, res) => {
    try {
        const posts = await postModel.find();
        response(res, 200, true, posts, "listas de posts");
    } catch (error) {
        response(res, false, "", error.message);
    }
    postCtrl.listar = async(req, res) => {};
};

postCtrl.listOne = async(req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);
        if (!post) {
            return response(res, 404, false, "", "Registro no encontrado");
        }
        response(res, 200, true, post, "Post encontrado");
    } catch (error) {}
};

postCtrl.add = async(req, res) => {
    try {
        const { title, description } = req.body;
        const newPost = new postModel({
            title,
            description,
        });

        // req.file && newPost.setImg(req.file.file);

        if (req.file) {
            const { secure_url, public_id } = await subirImageACloudinary(req.file)
            newPost.setImg({ secure_url, public_id });
        }

        await postModel.create(newPost);
        response(res, 201, true, newPost, "Post creado ");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

postCtrl.delete = async(req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);
        if (!post) {
            return response(res, 404, false, "", "Registro no encontrado");
        }

        if (post.public_id) {
            await eliminarImagenCloudinary(post.public_id);
        }

        post.nameImage && deleteImg(post.nameImage);

        await post.deleteOne();
        response(res, 200, true, "", "Post eliminado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

postCtrl.update = async(req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);
        if (!post) {
            return response(res, 404, false, "", "Registro no encontrado");
        }

        if (req.file) {
            // post.nameImage && deleteImg(post.nameImage);
            // post.setImg(req.file.filename);
            if (post.public_id) {
                await eliminarImagenCloudinary(post.public_id);
            }
            const { secure_url, public_id } = await subirImageACloudinary(req.file);
            post.setImg({ secure_url, public_id });

            await post.save();
        }

        await post.updateOne(req.body);
        response(res, 200, true, "", "Post actualizado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

export default postCtrl;