"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.motivationRouter = void 0;
const express_1 = require("express");
const motivation_controller_1 = require("../controller/motivation.controller");
exports.motivationRouter = express_1.Router({ mergeParams: true });
exports.motivationRouter.get('/motivation', motivation_controller_1.getMotivationFromExternalApi);
//# sourceMappingURL=motivation.router.js.map