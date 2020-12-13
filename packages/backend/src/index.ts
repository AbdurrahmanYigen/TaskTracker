// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();
import 'reflect-metadata';
import express from 'express';
import { createDatabaseConnection } from './util/createDatabaseConnection';
import * as bodyParser from 'body-parser';
import { globalRouter } from './router/global.router';

const port: number = Number(process.env.PORT);

export const startServer = async () => {
    try {
        const app = express();
        const dbConnection = await createDatabaseConnection();
        app.use(bodyParser.json());
        app.use('/api', globalRouter);
        const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
        return { server, dbConnection };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// tslint:disable-next-line: no-floating-promises
startServer();
