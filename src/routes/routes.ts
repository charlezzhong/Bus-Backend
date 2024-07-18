import express from "express";
import { getAllRoutes, getVehicleImage, getRouteInfoVersion, getRouteInformation } from "../controllers/routes";

const router = express.Router();

router.get('/getAllRoutes', getAllRoutes);
router.get('/getVehicleImage/:route', getVehicleImage);
router.get('/getRouteInfoVersion', getRouteInfoVersion);
router.get('/getRouteInformation', getRouteInformation);

export default router;
