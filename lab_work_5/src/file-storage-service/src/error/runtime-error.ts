
export abstract class RuntimeError extends Error {
    protected abstract status: number;

    protected constructor(message: string) {
        super(message);
    }

    public getStatus(): number {
        return this.status;
    }

    public getMessage(): string {
        return this.message;
    }
}