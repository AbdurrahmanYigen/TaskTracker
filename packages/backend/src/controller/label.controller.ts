import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Label } from '../entity/Label';

export const createLabel = async (req: Request, res: Response) => {
    const { name } = req.body;
    const labelRepository = getRepository(Label);
    const label = new Label();
    label.name = name;
    try {
        await labelRepository.save(label);
        res.send({
            data: label,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        })
    }
};

export const getLabelById = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const labelRepository = getRepository(Label);
    try {
        const label = await labelRepository.findOneOrFail({ where: { id: labelId }, relations: ['tasks'] });
        res.send({
            data: label,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

export const getAllLabels = async (_: Request, res: Response) => {
    const labelRepository = getRepository(Label);
    try {
        const labels = await labelRepository.find();
        res.send({
            data: labels,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

export const patchLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const { name } = req.body;
    const labelRepository = getRepository(Label);
    try {
        const label = await labelRepository.findOneOrFail(labelId);
        label.name = name;
        const patchedLabel = await labelRepository.save(label);
        res.send({
            patchedLabel,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};

export const deleteLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const labelRepository = getRepository(Label);
    try {
        const label = await labelRepository.findOneOrFail(labelId);
        await labelRepository.remove(label);
        res.send({});
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'not_found',
        });
    }
};
