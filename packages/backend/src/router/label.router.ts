import { Router } from 'express';
import { createLabel, deleteLabel, getAllLabels, getLabelById, patchLabel } from '../controller/label.controller';

export const labelRouter = Router({ mergeParams: true });

labelRouter.post('/', createLabel);
labelRouter.get('/:labelId', getLabelById);
labelRouter.get('/', getAllLabels);
labelRouter.patch('/:labelId', patchLabel);
labelRouter.delete('/:labelId', deleteLabel);
