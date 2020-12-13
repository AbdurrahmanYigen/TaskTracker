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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMotivationFromExternalApi = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const getMotivationFromExternalApi = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield node_fetch_1.default('https://type.fit/api/quotes');
        const quotes = yield response.json();
        res.send({
            data: quotes,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.getMotivationFromExternalApi = getMotivationFromExternalApi;
//# sourceMappingURL=motivation.controller.js.map