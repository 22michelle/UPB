import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./database.js";

// rutas
import mongoRoutes from "./src/routes/mongo.route.js"
import schoolRoutes from "./src/routes/school.route.js"
import studentRoute from "./src/routes/student.route.js"

connectDb()
const app = express();

app.set("Port", 4000);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/mongo",mongoRoutes)
app.use("/school",schoolRoutes)
app.use("/student",studentRoute)

app.listen(app.get("Port"), () => {
    console.log("Servidor corriendo por el puerto", app.get("Port"));
});