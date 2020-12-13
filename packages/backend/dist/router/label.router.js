"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelRouter = void 0;
const express_1 = require("express");
const label_controller_1 = require("../controller/label.controller");
exports.labelRouter = express_1.Router({ mergeParams: true });
exports.labelRouter.post('/', label_controller_1.createLabel);
exports.labelRouter.get('/:labelId', label_controller_1.getLabelById);
exports.labelRouter.get('/', label_controller_1.getAllLabels);
exports.labelRouter.patch('/:labelId', label_controller_1.patchLabel);
exports.labelRouter.delete('/:labelId', label_controller_1.deleteLabel);
//# sourceMappingURL=label.router.js.map