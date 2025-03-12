import {AssertionFailedError} from "../error/hash/assertion-failed-error";

export class Assert {
    public static notNull(obj: any, msg: string): void {
        if (obj === null) {
            throw new AssertionFailedError(msg);
        }
    }

    public static notNullOrUndefined(obj: any, msg: string): void {
        if (obj === null || obj === undefined) {
            throw new AssertionFailedError(msg);
        }
    }

    public static isBoolean(obj: any): void {
        if (!(obj instanceof Boolean)) {
            throw new AssertionFailedError("Object is not a bool");
        }
    }
    public static isString(obj: any): void {
        if (!(obj instanceof String)) {
            throw new AssertionFailedError("Object is not a string");
        }
    }

    public static isNumber(obj: any): void {
        if (Number.isNaN(obj)) {
            throw new AssertionFailedError("Object is not a number");
        }
    }
}