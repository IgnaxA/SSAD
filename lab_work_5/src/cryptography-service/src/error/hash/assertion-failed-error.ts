import {RuntimeError} from "../runtime-error";

export class AssertionFailedError extends RuntimeError {
    protected status: number = 500;

    constructor(message: string) {
        super(message);
    }
}