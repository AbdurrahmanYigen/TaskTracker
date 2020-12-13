import { Router } from "express";
import { getMotivationFromExternalApi } from "../controller/motivation.controller";

export const motivationRouter = Router({ mergeParams: true });

motivationRouter.get('/motivation', getMotivationFromExternalApi);