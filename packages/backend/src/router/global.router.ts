import { Request, Response, Router } from 'express';
import { labelRouter } from './label.router';
import { motivationRouter } from './motivation.router';
import { taskRouter } from './task.router';
import { trackingRouter } from './tracking.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send({ message: 'Welcome to the time-tracker api' });
});

globalRouter.use('/task', taskRouter);
globalRouter.use('/label', labelRouter);
globalRouter.use('/tracking', trackingRouter);
globalRouter.use('/', motivationRouter);
