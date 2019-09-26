import {expect} from "chai";
import { GameMessage } from "../../../../common/communication/gameMessage";
import gameMessageType from "../../../../common/communication/gameMessageType";
import {MessageManager} from "./messageManager";

describe("MessageManager Tests", () => {

    it("Should create a game message when calling the function 'createDifferenceFoundMessage'", () => {
        const gameMessage: GameMessage = MessageManager.createDifferenceFoundMessage(gameMessageType.DIFFERENCE_FOUND, 0, "name");
        expect(gameMessage.messageType === gameMessageType.DIFFERENCE_FOUND);
    });

    it("Should create a game message when calling the function 'createErrorMessage'", () => {
        const gameMessage: GameMessage = MessageManager.createErrorMessage(gameMessageType.DIFFERENCE_FOUND, 0, "name");
        expect(gameMessage.messageType === gameMessageType.DIFFERENCE_FOUND);
    });

    it("Should create a game message when calling the function 'createBestTimeMessage'", () => {
        const gameMessage: GameMessage = MessageManager.createBestTimeMessage(gameMessageType.DIFFERENCE_FOUND,
                                                                              "name", "first", "game", "solo");
        expect(gameMessage.messageType === gameMessageType.DIFFERENCE_FOUND);
    });

    it("Should create a game message when calling the function 'createConnexionMessage'", () => {
        const gameMessage: GameMessage = MessageManager.createConnexionMessage(gameMessageType.DIFFERENCE_FOUND, "name");
        expect(gameMessage.messageType === gameMessageType.DIFFERENCE_FOUND);
    });

    it("Should create a game message when calling the function 'createDeconnexionMessage'", () => {
        const gameMessage: GameMessage = MessageManager.createDeconnexionMessage(gameMessageType.DIFFERENCE_FOUND, "name");
        expect(gameMessage.messageType === gameMessageType.DIFFERENCE_FOUND);
    });

    it("Should create a game message when calling the function 'createDifferenceFoundMessage'", () => {
        const gameMessage: GameMessage = MessageManager.createDifferenceFoundMessage(gameMessageType.DIFFERENCE_FOUND, 0, "name");
        expect(gameMessage.messageType === gameMessageType.DIFFERENCE_FOUND);
    });
});
