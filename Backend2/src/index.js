import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./database.js";

// rutas  
import empleadoRoutes from "./routes/EmpleadoRoutes.js"

connectDb();

const app = express();

app.set("Port", 4000);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/empleados", empleadoRoutes);

app.listen(app.get("Port"), () => {
    console.log("Servidor escuchando por el puerto", app.get("Port"));
});