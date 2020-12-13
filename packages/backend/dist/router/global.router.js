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
exports.globalRouter = void 0;
const express_1 = require("express");
const label_router_1 = require("./label.router");
const motivation_router_1 = require("./motivation.router");
const task_router_1 = require("./task.router");
const tracking_router_1 = require("./tracking.router");
exports.globalRouter = express_1.Router({ mergeParams: true });
exports.globalRouter.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: 'Welcome to the time-tracker api' });
}));
exports.globalRouter.use('/task', task_router_1.taskRouter);
exports.globalRouter.use('/label', label_router_1.labelRouter);
exports.globalRouter.use('/tracking', tracking_router_1.trackingRouter);
exports.globalRouter.use('/', motivation_router_1.motivationRouter);
//# sourceMappingURL=global.router.js.map