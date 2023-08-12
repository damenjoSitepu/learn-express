import express from "express";
import { CONFIG } from "./config";
import { ROUTE_URL } from "./route-url";

const finalApp = express();

// First request on the root 
finalApp.get(ROUTE_URL.ROOT, (req, res) => {
    return res.send("Root route!");
});

finalApp.listen(CONFIG.PORT, () => {
    console.log("Final app has been released!");
});