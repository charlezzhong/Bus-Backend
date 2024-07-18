import { Request, Response } from "express";
import client from "../utils/client";
import { routes } from "../models/bus";

export const getStopPredictions = async (req: Request, res: Response) => {
    const { stopId } = req.params;

    try {
        const stopPreds = await client.get('/getpredictions', {
            params: {
                requestType: 'getpredictions',
                locale: 'en',
                stpid: stopId,
                rt: routes.join(','),
                rtpidatafeed: 'bustime',
                top: 4,
            }
        });

        res.send(stopPreds.data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getUpdateNotes = (req: Request, res: Response) => {
    res.send({ message: "- ·Support new routes\n- ·Added route names to arrivals at shared stops\n- ·General improvements", version: "6" });
};

export const getStartupMessages = (req: Request, res: Response) => {
    res.send(JSON.stringify({ id: "gradamatation", title: "Congrats Grads 🥳", message: "Congrats to everyone who is gradamatating! Enjoy some grad hats on the buses, and don't forget to celebrate!", buildVersion: '99' }));
};
