import {HashController} from "../hash-controller";
import {Request, Response} from "express";
import {HashEvaluatorDispatcher} from "../../domain/hash/dispatcher/hash-evaluator-dispatcher";

export class RestHashController implements HashController {
    private readonly hashEvaluatorDispatcher: HashEvaluatorDispatcher;

    constructor(hashEvaluatorDispatcher: HashEvaluatorDispatcher) {
        this.hashEvaluatorDispatcher = hashEvaluatorDispatcher;
    }

    public get256BitHash = async (req: Request, res: Response): Promise<void> => {
        const body: RestHashRequest = this.parseReqBody(req);

        const hash: string = await this.hashEvaluatorDispatcher.getHashEvaluator(body.algorithm)
            .get256BitHash(body.data);

        res.status(200)
            .json({
                "hash": hash
            });
    }

    public get512BitHash = async (req: Request, res: Response): Promise<void> => {
        const body: RestHashRequest = this.parseReqBody(req);

        const hash: string = await this.hashEvaluatorDispatcher.getHashEvaluator(body.algorithm)
            .get512BitHash(body.data);

        res.status(200)
            .json({
                "hash": hash
            });
    }

    private parseReqBody(req: Request): RestHashRequest {
        return req.body;
    }
}

interface RestHashRequest {
    algorithm: string;
    data: object;
}