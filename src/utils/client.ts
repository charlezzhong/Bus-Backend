import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.MBUS_API_KEY;
if (API_KEY === undefined) {
    throw new Error("MBus API key not set.");
}

const client = axios.create({
    baseURL: 'https://mbus.ltp.umich.edu/bustime/api/v3/',
    params: {
        key: API_KEY,
        format: 'json'
    }
});

export default client;
