"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const task_controller_1 = require("../controller/task.controller");
exports.taskRouter = express_1.Router({ mergeParams: true });
exports.taskRouter.post('/', task_controller_1.createTask);
exports.taskRouter.get('/:taskId', task_controller_1.getTaskById);
exports.taskRouter.patch('/:taskId', task_controller_1.patchTask);
exports.taskRouter.delete('/:taskId', task_controller_1.deleteTaskById);
exports.taskRouter.get('/', task_controller_1.getAllTasks);
//# sourceMappingURL=task.router.js.map