import express, { Request, Response } from "express";
import { CONFIG } from "./config";
import { ROUTE_URL } from "./route-url";
import { RESPONSE_MESSAGE } from "./response-message";
import { CHART_OF_ACCOUNTS } from "./data/chart-of-accounts/chart-of-accounts";
import { ChartOfAccount } from "./data/chart-of-accounts/chart-of-accounts.interface";
import { forbiddenCoaMiddleware } from "./middleware/forbidden-coa.middleware";

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

// Next request with redirect returned
finalApp.post(ROUTE_URL.REAL_REDIRECT_TO_GOOGLE, (req: Request, res: Response) => {
    return res.redirect("https://google.co.uk");
});

// Next request with chaining routes
finalApp.route(ROUTE_URL.REAL_CHART_OF_ACCOUNT)
    .get((req: Request, res: Response) => {
        return res.json({
            error: false,
            code: 200,
            message: RESPONSE_MESSAGE.SUCCESS_GET_CHART_OF_ACCOUNTS,
            data: {
                chartOfAccounts: [
                    {id: 1, name: "Group A Sales"},
                    {id: 2, name: "Group B Sales"},
                ]
            }
        });     
    })
    .post((req: Request, res: Response) => {
        return res.json({
            error: false,
            code: 201,
            message: RESPONSE_MESSAGE.SUCCESS_CREATE_CHART_OF_ACCOUNT,
            data: {
                chartOfAccounts: [
                    {id: 3, name: "Operation Expense"}
                ]
            }
        });
    })
    .put((req: Request, res: Response) => {
        return res.json({
            error: false,
            code: 202,
            message: RESPONSE_MESSAGE.SUCCESS_UPDATE_CHART_OF_ACCOUNT,
            data: {
                chartOfAccounts: [
                    {id: 4, name: "Company equity"}
                ]
            }
        });
    })
    .delete((req: Request, res: Response) => {
        return res.json({
            error: false,
            code: 203,
            message: RESPONSE_MESSAGE.SUCCESS_DELETE_CHART_OF_ACCOUNT,
            data: {
                chartOfAccounts: [
                    {id: 5, name: "Group A Revenue!"}
                ]
            }
        })
    }); 

// Next Request with between sign
finalApp.post("/damenjo*sitepu", (req: Request, res: Response) => {
    return res.json({
        error: false,
        code: 200,
        message: "Successfully get data with between sign!"
    });
});

// Next request with regex
finalApp.post(/damenjo/, (req: Request, res: Response) => {
    return res.json({
        error: false,
        code: 200,
        message: "Successfully get data with 'damenjo' regex!"
    });
});

// Next request with route parameter also with currying middleware technique
finalApp.use(forbiddenCoaMiddleware({ age: 20 }));
finalApp.post(ROUTE_URL.REAL_CHART_OF_ACCOUNT_WITH_ID, (req: Request, res: Response) => {
    // @ts-ignore
    console.log(req.myInfo);
    const chartOfAccounts: ChartOfAccount[] = CHART_OF_ACCOUNTS ?? [];
    if (chartOfAccounts.length === 0) {
        return res.json({
            error: true,
            code: 404,
            message: RESPONSE_MESSAGE.CHART_OF_ACCOUNT_ARE_EMPTY
        });
    }
    const chartOfAccount = chartOfAccounts.find((chartOfAccount: ChartOfAccount) => chartOfAccount.id === parseInt(req.params.id ?? 0));
    if (chartOfAccount === undefined) {
        return res.json({
            error: true,
            code: 404,
            message: RESPONSE_MESSAGE.CHART_OF_ACCOUNT_NOT_FOUND
        });
    }
    return res.json({
        error: false,
        code: 200,
        message: RESPONSE_MESSAGE.SUCCESS_GET_CHART_OF_ACCOUNT,
        data: {
            chartOfAccount: chartOfAccount
        }
    });
});

finalApp.listen(CONFIG.PORT, () => {
    console.log("Final app has been released!");
});