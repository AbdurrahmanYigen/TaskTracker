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
exports.patchTracking = exports.getTrackingById = exports.deleteTracking = exports.createTracking = void 0;
const typeorm_1 = require("typeorm");
const Task_1 = require("../entity/Task");
const Tracking_1 = require("../entity/Tracking");
const createTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, startTime, endTime, task } = req.body;
    const trackingRepository = typeorm_1.getRepository(Tracking_1.Tracking);
    try {
        const tracking = new Tracking_1.Tracking();
        tracking.description = description;
        tracking.startTime = startTime;
        tracking.endTime = endTime;
        const taskRepository = typeorm_1.getRepository(Task_1.Task);
        const dbTask = yield taskRepository.findOneOrFail({ where: { name: task }, relations: ['trackings'] });
        dbTask.trackings.push(tracking);
        yield trackingRepository.save(tracking);
        yield taskRepository.save(dbTask);
        res.send({
            data: dbTask,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'failed creating tracking',
        });
    }
});
exports.createTracking = createTracking;
const deleteTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingId = req.params.trackingId;
    console.log(req.body);
    const trackingRepository = typeorm_1.getRepository(Tracking_1.Tracking);
    try {
        const tracking = yield trackingRepository.findOneOrFail(trackingId);
        yield trackingRepository.remove(tracking);
        res.send({});
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.deleteTracking = deleteTracking;
const getTrackingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingId = req.params.trackingId;
    const trackingRepository = typeorm_1.getRepository(Tracking_1.Tracking);
    try {
        const tracking = yield trackingRepository.findOneOrFail(trackingId);
        console.log(tracking);
        res.send({
            tracking,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.getTrackingById = getTrackingById;
const patchTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingId = req.params.trackingId;
    const { description } = req.body;
    const trackingRepository = typeorm_1.getRepository(Tracking_1.Tracking);
    try {
        const tracking = yield trackingRepository.findOneOrFail(trackingId);
        tracking.description = description;
        /* tracking.startTime = startTime;
        tracking.endTime = endTime; */
        yield trackingRepository.save(tracking);
        res.send({
            data: tracking,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.patchTracking = patchTracking;
//# sourceMappingURL=tracking.controller.js.map