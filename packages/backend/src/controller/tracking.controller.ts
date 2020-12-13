import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Task } from '../entity/Task';
import { Tracking } from '../entity/Tracking';

export const createTracking = async (req: Request, res: Response) => {
    const { description, startTime, endTime, task } = req.body;
    const trackingRepository = getRepository(Tracking);
    try {
        const tracking = new Tracking();
        tracking.description = description;
        tracking.startTime = startTime;
        tracking.endTime = endTime;

        const taskRepository = getRepository(Task);
        const dbTask = await taskRepository.findOneOrFail({ where: { name: task }, relations: ['trackings'] });
        dbTask.trackings.push(tracking);

        await trackingRepository.save(tracking);
        await taskRepository.save(dbTask);
        res.send({
            data: dbTask,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'failed creating tracking',
        });
    }
};

export const deleteTracking = async (req: Request, res: Response) => {
    const trackingId = req.params.trackingId;
    console.log(req.body);
    const trackingRepository = getRepository(Tracking);
    try {
        const tracking = await trackingRepository.findOneOrFail(trackingId);
        await trackingRepository.remove(tracking);
        res.send({});
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

export const getTrackingById = async (req: Request, res: Response) => {
    const trackingId = req.params.trackingId;
    const trackingRepository = getRepository(Tracking);
    try {
        const tracking = await trackingRepository.findOneOrFail(trackingId);
        console.log(tracking);
        res.send({
            tracking,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

export const patchTracking = async (req: Request, res: Response) => {
    const trackingId = req.params.trackingId;
    const { description } = req.body;
    const trackingRepository = getRepository(Tracking);
    try {
        const tracking = await trackingRepository.findOneOrFail(trackingId);
        tracking.description = description;
        /* tracking.startTime = startTime;
        tracking.endTime = endTime; */
        await trackingRepository.save(tracking);
        res.send({
            data: tracking,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};
