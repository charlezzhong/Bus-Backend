import express from "express";
import helmet from "helmet";
//import cors from "cors";
//import compression from "compression";
import busRoutes from "./routes/buses";
import routeRoutes from "./routes/routes";
import stopRoutes from "./routes/stops";
import { updateBusPositions } from "./controllers/buses";
import { getSelectableRoutes } from "./controllers/routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// Interval functions
setInterval(updateBusPositions, 7500);
setInterval(getSelectableRoutes, 60000);
getSelectableRoutes();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
