import { ParamsDictionary } from './../../node_modules/@types/express-serve-static-core/index.d';
import { Request, Response, NextFunction } from "express";
import { RESPONSE_MESSAGE } from "../response-message";
import { ChartOfAccountParamGetRequest } from "../data/chart-of-accounts/chart-of-accounts.interface";

// With currying technique
export const forbiddenCoaMiddleware = ({age}: {age: number}) => (req: Request<ChartOfAccountParamGetRequest | ParamsDictionary>, res: Response, next: NextFunction) => {
    if (req.params.id == 1) {
        return res.json({
            error: true,
            code: 401,
            message: RESPONSE_MESSAGE.UNAUTHORIZED_CHART_OF_ACCOUNT
        });
    }
    next();
};