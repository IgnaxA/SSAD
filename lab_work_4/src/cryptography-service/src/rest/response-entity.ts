
export class ResponseEntity {
    private body: object;

    public setBody(body: object): ResponseEntity {
        this.body = body;

        return this;
    }
}