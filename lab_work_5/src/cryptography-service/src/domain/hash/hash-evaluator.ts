

export interface HashEvaluator {
    getIdent(): string;
    get256BitHash(data: object): Promise<string>;
    get512BitHash(data: object): Promise<string>;
}