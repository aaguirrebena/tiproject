import express, {json} from "express";
import morgan from "morgan";

//importing routes
import productRoutes from "./routes/products";
import taskRoutes from "./routes/tasks";

const app = express();

//middlewares
app.use(morgan("dev")); //muestra en consola lo que va llegando
app.use(json()); //permite entender los json que van llegando

//routes
app.use("/stock", productRoutes);
app.use("/api/tasks", taskRoutes);
// app.use("/g15/products", productRoutes);

export default app;