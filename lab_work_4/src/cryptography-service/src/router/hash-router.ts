import express, {Router} from "express";
import {HashController} from "../controller/hash-controller";

export class HashRouter {
    private readonly hashController: HashController;
    private readonly hashRouter: Router;
    private wasInitiated: boolean;

    constructor(hashController: HashController) {
        this.hashController = hashController;
        this.hashRouter = express.Router();
        this.wasInitiated = false;
    }

    public getRouter(): Router {
        if (!this.wasInitiated) {
            this.hashRouter.get("/get256BitHash", this.hashController.get256BitHash);
            this.hashRouter.get("/get512BitHash", this.hashController.get512BitHash);
        }
        this.wasInitiated = true;

        return this.hashRouter;
    }
}