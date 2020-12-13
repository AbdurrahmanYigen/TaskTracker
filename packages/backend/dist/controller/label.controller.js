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
exports.deleteLabel = exports.patchLabel = exports.getAllLabels = exports.getLabelById = exports.createLabel = void 0;
const typeorm_1 = require("typeorm");
const Label_1 = require("../entity/Label");
const createLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const labelRepository = typeorm_1.getRepository(Label_1.Label);
    const label = new Label_1.Label();
    label.name = name;
    try {
        yield labelRepository.save(label);
        res.send({
            data: label,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.createLabel = createLabel;
const getLabelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labelId = req.params.labelId;
    const labelRepository = typeorm_1.getRepository(Label_1.Label);
    try {
        const label = yield labelRepository.findOneOrFail({ where: { id: labelId }, relations: ['tasks'] });
        res.send({
            data: label,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.getLabelById = getLabelById;
const getAllLabels = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labelRepository = typeorm_1.getRepository(Label_1.Label);
    try {
        const labels = yield labelRepository.find();
        res.send({
            data: labels,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.getAllLabels = getAllLabels;
const patchLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labelId = req.params.labelId;
    const { name } = req.body;
    const labelRepository = typeorm_1.getRepository(Label_1.Label);
    try {
        const label = yield labelRepository.findOneOrFail(labelId);
        label.name = name;
        const patchedLabel = yield labelRepository.save(label);
        res.send({
            patchedLabel,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.patchLabel = patchLabel;
const deleteLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labelId = req.params.labelId;
    const labelRepository = typeorm_1.getRepository(Label_1.Label);
    try {
        const label = yield labelRepository.findOneOrFail(labelId);
        yield labelRepository.remove(label);
        res.send({});
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
});
exports.deleteLabel = deleteLabel;
//# sourceMappingURL=label.controller.js.map