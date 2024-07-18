import { Request, Response } from "express";
import client from "../utils/client";
import { cachedRoutes, curRouteSelections, validRoutes } from "../models/route";
import * as metadata from "../assets/route-data.json";
import * as path from "node:path";
import { Route } from "../types";

const dirname = path.dirname(new URL(import.meta.url).pathname);

export const addToCachedRoutes = async (rt: string) => {
    try {
        const res = await client.get('/getpatterns', {
            params: {
                requestType: 'getpatterns',
                rtpidatafeed: 'bustime',
                rt: rt
            }
        });

        if (res.data['bustime-response'] && res.data['bustime-response']['ptr']) {
            cachedRoutes[rt] = res.data['bustime-response']['ptr'];
        }
    } catch (e) {
        console.log(`Error while getting routes: ${e}`);
    }
};

export const getSelectableRoutes = async () => {
    try {
        const res = await client.get('/getroutes', {
            params: {
                requestType: 'getroutes',
                locale: 'en',
                key: process.env.MBUS_API_KEY,
                format: 'json'
            }
        });
        // Clear the curRouteSelections object
        Object.keys(curRouteSelections).forEach(key => delete curRouteSelections[key]);
        // Assign new data to curRouteSelections
        Object.assign(curRouteSelections, res.data);

        validRoutes.clear();
        res.data['bustime-response']['routes'].forEach((e: Route) => {
            validRoutes.add(e['rt']);
            addToCachedRoutes(e['rt']);
        });
    } catch (err) {
        console.log(`Error while getting selectable routes: ${err}`);
    }
};

export const getAllRoutes = (req: Request, res: Response) => {
    res.send({ routes: cachedRoutes });
};

export const getVehicleImage = (req: Request, res: Response) => {
    const { route } = req.params;
    const isColorblind = req.query.colorblind === "Y";

    const assetPath = path.join(dirname, '../assets');
    const colorBlindPath = path.join(assetPath, 'colorblind');
    const regularPath = path.join(assetPath, 'grad-24');

    if (!route || !(route in metadata.routeImages)) {
        res.sendFile(path.join(assetPath, 'bus_CN.png'));
        return res.sendStatus(400);
    }

    if (isColorblind) {
        res.sendFile(path.join(colorBlindPath, metadata.routeImages[route]));
    } else {
        res.sendFile(path.join(regularPath, metadata.routeImages[route]));
    }
};

export const getRouteInfoVersion = (req: Request, res: Response) => {
    res.send(JSON.stringify({ version: metadata.metadata.version }));
};

export const getRouteInformation = (req: Request, res: Response) => {
    const { isColorblind } = req.query;
    const infoToSend = {
        routeIdToName: metadata.routeIdToName,
        routeImages: metadata.routeImages,
        metadata: metadata.metadata,
        routeColors: {}
    };
    if (isColorblind === "Y") {
        infoToSend.routeColors = metadata.routeColorsColorblind;
    } else {
        infoToSend.routeColors = metadata.routeColorsRegular;
    }
    res.send(infoToSend);
};
