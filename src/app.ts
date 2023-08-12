import express, { Request, Response } from "express";
import { CONFIG } from "./config";
import { ROUTE_URL } from "./route-url";
import { RESPONSE_MESSAGE } from "./response-message";

const finalApp = express();

finalApp.use(express.json());

// First request on the root 
finalApp.get(ROUTE_URL.ROOT, (req: Request, res: Response) => {
    return res.send("Root route!");
});

// Second request for fake api data
finalApp.post(ROUTE_URL.FAKE_API, (req: Request, res: Response) => {
    console.log(req.body);
    return res.sendStatus(200);
});

// Third request for fake api data but using all() method
finalApp.all(ROUTE_URL.FAKE_ALL_API, (req: Request, res: Response) => {
    console.log(req.body);
    return res.sendStatus(200);
});

// Next request with real returning json response 
finalApp.post(ROUTE_URL.REAL_CHART_OF_ACCOUNTS, (req: Request, res: Response) => {
    return res.json({
        error: false,
        code: 200,
        message: RESPONSE_MESSAGE.SUCCESS_GET_CHART_OF_ACCOUNTS,
        data: {
            chartOfAccounts: [
                {id: 1, name: "Salary Expense"},
                {id: 2, name: "WI-FI Expense"},
            ]
        }
    });
});

finalApp.listen(CONFIG.PORT, () => {
    console.log("Final app has been released!");
});