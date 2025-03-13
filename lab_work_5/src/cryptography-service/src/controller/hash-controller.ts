import {Request, Response} from "express";

export interface HashController {
    get256BitHash(req: Request, res: Response): Promise<void>;
    get512BitHash(req: Request, res: Response): Promise<void>;
}