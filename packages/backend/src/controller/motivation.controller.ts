import { Request, Response } from "express";
import fetch from "node-fetch"

export const getMotivationFromExternalApi = async (_: Request, res: Response) => {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const quotes = await response.json();
        res.send({
            data: quotes,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }

};