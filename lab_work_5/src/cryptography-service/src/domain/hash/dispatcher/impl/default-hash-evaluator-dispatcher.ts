import {HashEvaluatorDispatcher} from "../hash-evaluator-dispatcher";
import {HashEvaluator} from "../../hash-evaluator";
import {HashEvaluatorNotFoundError} from "../../../../error/hash/hash-evaluator-not-found-error";


export class DefaultHashEvaluatorDispatcher implements HashEvaluatorDispatcher {
    private readonly hashEvaluators: Map<string, HashEvaluator> = new Map<string, HashEvaluator>();

    constructor(hashEvaluators: Array<HashEvaluator>) {
        hashEvaluators.forEach((hashEvaluator: HashEvaluator): void => {
            this.hashEvaluators.set(hashEvaluator.getIdent(), hashEvaluator);
        })
    }

    public getHashEvaluator(ident: string): HashEvaluator {
        const hashEvaluator: HashEvaluator | undefined = this.hashEvaluators.get(ident);

        if (hashEvaluator === undefined) {
            throw new HashEvaluatorNotFoundError("Cannot find hashEvaluator with ident " + ident);
        }

        return hashEvaluator;
    }
}