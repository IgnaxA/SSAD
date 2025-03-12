import {HashEvaluator} from "../hash-evaluator";
import createHash, {HashAlgorithm, algorithm} from "create-hash";


export class GostHashEvaluator implements HashEvaluator {

    getIdent(): string {
        return "GOST";
    }

    public async get256BitHash(data: object): Promise<string> {
        return await this.getHash("sha256", data);
    }

    public async get512BitHash(data: object): Promise<string> {
        return await this.getHash("sha512", data);
    }

    private async getHash(hashStandard: algorithm, data: object): Promise<string> {
        const hashAlgorithm: HashAlgorithm = createHash(hashStandard);
        hashAlgorithm.write((data as unknown) as string)
        hashAlgorithm.end();

        return hashAlgorithm.digest("base64");
    }
}