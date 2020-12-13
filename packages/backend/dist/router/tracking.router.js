"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingRouter = void 0;
const express_1 = require("express");
const tracking_controller_1 = require("../controller/tracking.controller");
exports.trackingRouter = express_1.Router({ mergeParams: true });
exports.trackingRouter.post('/', tracking_controller_1.createTracking);
exports.trackingRouter.delete('/:trackingId', tracking_controller_1.deleteTracking);
exports.trackingRouter.get('/:trackingId', tracking_controller_1.getTrackingById);
exports.trackingRouter.patch('/:trackingId', tracking_controller_1.patchTracking);
//# sourceMappingURL=tracking.router.js.map