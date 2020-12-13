"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = exports.deleteTaskById = exports.patchTask = exports.getTaskById = exports.createTask = void 0;
const typeorm_1 = require("typeorm");
const Task_1 = require("../entity/Task");
const Label_1 = require("../entity/Label");
const Tracking_1 = require("../entity/Tracking");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, trackings, labels } = req.body;
    const taskRepository = typeorm_1.getRepository(Task_1.Task);
    try {
        const task = new Task_1.Task();
        task.name = name;
        task.description = description;
        // should it be possible to create trackings while creating the task?
        if ('trackings' in req.body) {
            task.trackings = yield createTrackings(trackings);
        }
        task.labels = yield findOrCreateLabels(labels);
        const createdTask = yield taskRepository.save(task);
        res.send({
            data: createdTask,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'cant create Task!',
        });
    }
});
exports.createTask = createTask;
const findOrCreateLabels = (labels) => __awaiter(void 0, void 0, void 0, function* () {
    let tempArray = new Array();
    const labelRepository = typeorm_1.getRepository(Label_1.Label);
    for (const label of labels) {
        if ((yield labelRepository.find(label)).length === 0) {
            const createdLabel = yield labelRepository.save(label);
            tempArray.push(createdLabel);
        }
        else {
            const createdLabel = yield labelRepository.find(label);
            tempArray = tempArray.concat(createdLabel);
        }
    }
    return tempArray;
});
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const taskRepository = typeorm_1.getRepository(Task_1.Task);
    try {
        const task = yield taskRepository.findOneOrFail({ where: { id: taskId }, relations: ['labels', 'trackings'] });
        res.send({
            data: task,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.getTaskById = getTaskById;
const patchTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const { name, description, trackings, labels } = req.body;
    // const tempTask: Task = req.body;
    try {
        const taskRepository = typeorm_1.getRepository(Task_1.Task);
        const task = yield taskRepository.findOneOrFail({ where: { id: taskId }, relations: ['trackings'] });
        // Object.assign(task, tempTask);
        console.log(task);
        task.name = name;
        task.description = description;
        task.labels = yield findOrCreateLabels(labels);
        if ('trackings' in req.body) {
            task.trackings = task.trackings.concat(yield createTrackings(trackings));
        }
        const patchedTask = yield taskRepository.save(task);
        res.send({
            data: patchedTask,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.patchTask = patchTask;
const deleteTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const taskRepository = typeorm_1.getRepository(Task_1.Task);
    const trackingRepository = typeorm_1.getRepository(Tracking_1.Tracking);
    try {
        const task = yield taskRepository.findOneOrFail({ where: { id: taskId }, relations: ['trackings', 'labels'] });
        yield trackingRepository.remove(task.trackings);
        yield taskRepository.remove(task);
        res.send({});
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.deleteTaskById = deleteTaskById;
const createTrackings = (trackings) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingArray = [];
    trackings.forEach((tracking) => {
        const tempTracking = new Tracking_1.Tracking();
        tempTracking.description = tracking.description;
        tempTracking.startTime = tracking.startTime;
        tempTracking.endTime = tracking.endTime;
        trackingArray.push(tempTracking);
    });
    const trackingRepository = typeorm_1.getRepository(Tracking_1.Tracking);
    for (const tracking of trackingArray) {
        yield trackingRepository.save(tracking);
    }
    return trackingArray;
});
const getAllTasks = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskRepository = typeorm_1.getRepository(Task_1.Task);
    try {
        const tasks = yield taskRepository.find({ relations: ['trackings', 'labels'] });
        res.send({
            data: tasks,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'cant create Task!',
        });
    }
});
exports.getAllTasks = getAllTasks;
//# sourceMappingURL=task.controller.js.map