export class SimpleGameCreationError extends Error {
    public constructor() {
        super("There has been an error while creating game");
        alert(this.message);
    }
}
