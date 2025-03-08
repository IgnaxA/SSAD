import {HashEvaluatorDispatcher} from "../hash-evaluator-dispatcher";
import {HashEvaluator} from "../../hash-evaluator";


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
            throw new Error("Cannot find hashEvaluator with ident " + ident);
        }

        return hashEvaluator;
    }
}