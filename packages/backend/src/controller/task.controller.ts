import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Task } from '../entity/Task';
import { Label } from '../entity/Label';
import { Tracking } from '../entity/Tracking';

export const createTask = async (req: Request, res: Response) => {
    const { name, description, trackings, labels } = req.body;
    const taskRepository = getRepository(Task);
    try {
        const task = new Task();
        task.name = name;
        task.description = description;
        // should it be possible to create trackings while creating the task?
        if ('trackings' in req.body) {
            task.trackings = await createTrackings(trackings);
        }
        task.labels = await findOrCreateLabels(labels);
        const createdTask = await taskRepository.save(task);
        res.send({
            data: createdTask,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'cant create Task!',
        });
    }
};

const findOrCreateLabels = async (labels: Label[]) => {
    let tempArray = new Array();
    const labelRepository = getRepository(Label);
    for (const label of labels) {
        if ((await labelRepository.find(label)).length === 0) {
            const createdLabel = await labelRepository.save(label);
            tempArray.push(createdLabel);
        } else {
            const createdLabel = await labelRepository.find(label);
            tempArray = tempArray.concat(createdLabel);
        }
    }
    return tempArray;
};

export const getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskRepository = getRepository(Task);
    try {
        const task = await taskRepository.findOneOrFail({ where: { id: taskId }, relations: ['labels', 'trackings'] });
        res.send({
            data: task,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

export const patchTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const { name, description, trackings, labels } = req.body;
    // const tempTask: Task = req.body;
    try {
        const taskRepository = getRepository(Task);
        const task = await taskRepository.findOneOrFail({ where: { id: taskId }, relations: ['trackings'] });
        // Object.assign(task, tempTask);
        console.log(task);
        task.name = name;
        task.description = description;
        task.labels = await findOrCreateLabels(labels);
        if ('trackings' in req.body) {
            task.trackings = task.trackings.concat(await createTrackings(trackings));
        }
        const patchedTask = await taskRepository.save(task);
        res.send({
            data: patchedTask,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

export const deleteTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskRepository = getRepository(Task);
    const trackingRepository = getRepository(Tracking);
    try {
        const task = await taskRepository.findOneOrFail({ where: { id: taskId }, relations: ['trackings', 'labels'] });
        await trackingRepository.remove(task.trackings);
        await taskRepository.remove(task);
        res.send({});
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

const createTrackings = async (trackings: Tracking[]) => {
    const trackingArray: Tracking[] = [];

    trackings.forEach((tracking) => {
        const tempTracking = new Tracking();
        tempTracking.description = tracking.description;
        tempTracking.startTime = tracking.startTime;
        tempTracking.endTime = tracking.endTime;
        trackingArray.push(tempTracking);
    });
    const trackingRepository = getRepository(Tracking);

    for (const tracking of trackingArray) {
        await trackingRepository.save(tracking);
    }

    return trackingArray;
};

export const getAllTasks = async (_: Request, res: Response) => {
    const taskRepository = getRepository(Task);
    try {
        const tasks = await taskRepository.find({ relations: ['trackings', 'labels'] });
        res.send({
            data: tasks,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'cant create Task!',
        });
    }
};
