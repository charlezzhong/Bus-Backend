import express from "express";
import { getStopPredictions, getUpdateNotes, getStartupMessages } from "../controllers/stops";

const router = express.Router();

router.get('/getStopPredictions/:stopId', getStopPredictions);
router.get('/getUpdateNotes', getUpdateNotes);
router.get('/get-startup-messages', getStartupMessages);

export default router;
