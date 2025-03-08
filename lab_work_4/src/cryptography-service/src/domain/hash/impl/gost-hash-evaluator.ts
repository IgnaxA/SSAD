import {HashEvaluator} from "../hash-evaluator";


export class GostHashEvaluator implements HashEvaluator {

    getIdent(): string {
        return "GOST";
    }

    public async get256BitHash(data: object): Promise<string> {
        return "";
    }

    public async get512BitHash(data: object): Promise<string> {
        return "";
    }
}