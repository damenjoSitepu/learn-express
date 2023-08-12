import { Request, Response, NextFunction } from "express";
import { RESPONSE_MESSAGE } from "../response-message";

export const forbiddenCoaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if ((parseInt(req.params.id ?? 0)) === 1) {
        return res.json({
            error: true,
            code: 401,
            message: RESPONSE_MESSAGE.UNAUTHORIZED_CHART_OF_ACCOUNT
        });
    }
    next();
};