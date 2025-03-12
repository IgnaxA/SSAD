import {HashEvaluator} from "../hash-evaluator";

export interface HashEvaluatorDispatcher {
    getHashEvaluator(ident: string): HashEvaluator;
}