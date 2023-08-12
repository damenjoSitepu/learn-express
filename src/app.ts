import express from "express";
import { CONFIG } from "./config";

const finalApp = express();

// First request on the root 
finalApp.get("/", (req, res) => {
    return res.send("Root route!");
});

finalApp.listen(CONFIG.PORT, () => {
    console.log("Final app has been released!");
});