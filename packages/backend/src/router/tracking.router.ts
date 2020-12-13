import { Router } from 'express';
import { createTracking, deleteTracking, getTrackingById, patchTracking } from '../controller/tracking.controller';

export const trackingRouter = Router({ mergeParams: true });

trackingRouter.post('/', createTracking);
trackingRouter.delete('/:trackingId', deleteTracking);
trackingRouter.get('/:trackingId', getTrackingById);
trackingRouter.patch('/:trackingId', patchTracking);
