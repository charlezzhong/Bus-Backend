import { Request, Response } from "express";
import client from "../utils/client";
import { routes, curBusPositions } from "../models/bus";

const getBuses = async () => {
    const getChunk = async (routesChunk: string[]) => {
        const res = await client.get('/getvehicles', {
            params: {
                requestType: 'getvehicles',
                rt: routesChunk.join(',')
            }
        });

        if ('bustime-response' in res.data && 'vehicle' in res.data['bustime-response']) {
            // const vehicles = res.data['bustime-response']['vehicle'];
            // console.log(vehicles)
            return res.data['bustime-response']['vehicle'];
        }

        return [];
    };

    const chunks: string[][] = [];
    for (let i = 0; i < routes.length; i += 10) {
        chunks.push(routes.slice(i, i + 10));
    }

    let buses = await Promise.all(chunks.map(getChunk));
    buses = buses.flat();

    return buses;
};

export const updateBusPositions = async () => {
    curBusPositions.buses = await getBuses();
};

export const getBusPositions = (req: Request, res: Response) => {
    res.send(curBusPositions);
};

export const getBusPredictions = async (req: Request, res: Response) => {
    try {
        const { busId } = req.params;
        const response = await client.get('/getpredictions', {
            params: {
                requestType: 'getpredictions',
                locale: 'en',
                vid: busId,
                top: 4,
                tmres: 's',
                rtpidatafeed: 'bustime'
            }
        });
        res.send(response.data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
