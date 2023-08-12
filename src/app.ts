import express from "express";
import { CONFIG } from "./config";
import { ROUTE_URL } from "./route-url";

const finalApp = express();

finalApp.use(express.json());

// First request on the root 
finalApp.get(ROUTE_URL.ROOT, (req, res) => {
    return res.send("Root route!");
});

// Second request for fake api data
finalApp.post(ROUTE_URL.FAKE_API, (req, res) => {
    console.log(req.body);
    return res.sendStatus(200);
});

// Third request for fake api data but using all() method
finalApp.all(ROUTE_URL.FAKE_ALL_API, (req, res) => {
    console.log(req.body);
    return res.sendStatus(200);
});

finalApp.listen(CONFIG.PORT, () => {
    console.log("Final app has been released!");
});