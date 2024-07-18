import express from "express";
import { getBusPositions, getBusPredictions } from "../controllers/buses";

const router = express.Router();

router.get('/getBusPositions', getBusPositions);
router.get('/getBusPredictions/:busId', getBusPredictions);

export default router;
