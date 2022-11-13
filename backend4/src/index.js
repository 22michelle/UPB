import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./database.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// rutas
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

connectDb();
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("Port", 4000);
app.use("/public", express.static(__dirname + "/storage/imgs"));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/post", postRoute);
app.use("/user", userRoute);

app.listen(app.get("Port"), () => {
    console.log("Servidor corriendo por el puerto", app.get("Port"));
});