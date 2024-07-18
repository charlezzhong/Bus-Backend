import express from "express";
import helmet from "helmet";
//import cors from "cors";
//import compression from "compression";
import busRoutes from "./routes/buses";
import routeRoutes from "./routes/routes";
import stopRoutes from "./routes/stops";

const app = express();

// Middleware setup
app.use(helmet());
//app.use(cors());
//app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use("/bus", busRoutes);
app.use("/route", routeRoutes);
app.use("/stop", stopRoutes);

export default app;
