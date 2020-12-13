import { Router } from 'express';
import { createTask, deleteTaskById, getAllTasks, getTaskById, patchTask } from '../controller/task.controller';

export const taskRouter = Router({ mergeParams: true });

taskRouter.post('/', createTask);
taskRouter.get('/:taskId', getTaskById);
taskRouter.patch('/:taskId', patchTask);
taskRouter.delete('/:taskId', deleteTaskById);
taskRouter.get('/', getAllTasks);
