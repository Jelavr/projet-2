import * as chai from "chai";
import spies = require("chai-spies");
chai.use(spies);
import * as socketIo from "socket.io-client";
import { Card } from "../../../../common/communication/card";
import { GameMessage } from "../../../../common/communication/gameMessage";
import gameMessageType from "../../../../common/communication/gameMessageType";
import { MultiMessage } from "../../../../common/communication/messages";
import SocketEvents from "../../../../common/communication/socketEvents";
import { BASE_URL } from "../../constantes";
import { container } from "../../inversify.config";
import { Server } from "../../server";
import Types from "../../types";
import { CardsUtil } from "../cards/cards-util";
import { UsersService } from "../users/users.service";
import { SocketService } from "./socket.service";

const SERVER_URL: string = BASE_URL;
const TEN: number = 10;

describe ("SocketService Tests : ", () => {
    let server: Server;

    let socketClient: SocketIOClient.Socket;
    let anotherSocketClient: SocketIOClient.Socket;
    const usersService: UsersService = container.get<UsersService>(Types.UsersService);
    server = container.get<Server>(Types.Server);
    server.init();
    socketClient = socketIo.connect(SERVER_URL);
    anotherSocketClient = socketIo.connect(SERVER_URL);

    let socketService: SocketService;
    beforeEach(() => {
        socketService = container.get<SocketService>(Types.SocketService);
});

    after( () => {
        server.stop();
    });

    it("should be able to send games", (done: Mocha.Done) => {
        socketClient.on(SocketEvents.LoadGames, (data: Card[]) => {
            chai.expect(data).to.deep.equal(CardsUtil.cards);
            done();
        });
        socketClient.emit(SocketEvents.LoadGames);
    });

    it("should be able to add a user to the user array", (done: Mocha.Done) => {
        socketClient.on(SocketEvents.Initialisation, (length: number) => {
            chai.expect(length).to.be.greaterThan(0);
            done();
        });
        socketClient.emit(SocketEvents.Initialisation, JSON.stringify({ "username": "gorgie" }));

    });

    it("should be able to call sendToLobby without problems", () => {
        chai.spy.on(SocketService.prototype, "sendToLobby");
        socketService.sendToLobby("msg");
        chai.expect(SocketService.prototype.sendToLobby).to.have.been.called();
    });

    it("should be able to call sendMultiMsgToRoom without problems", () => {
        const message: MultiMessage = {
            event: 0,
            player: "player",
            differenceCount: 5,
        };
        chai.spy.on(SocketService.prototype, "sendMultiMsgToRoom");
        socketService.sendMultiMsgToRoom("msg", message );
        chai.expect(SocketService.prototype.sendMultiMsgToRoom).to.have.been.called();
    });

    it("should be able to create rooms for sockets and send message to them", (done: Mocha.Done) => {
        socketClient.on(SocketEvents.Message, (data: GameMessage) => {
            if (data.messageType === gameMessageType.DIFFERENCE_FOUND) {
                chai.expect(data.message).to.deep.equal("You won!");
            }
            done();
        });

        socketClient.emit(SocketEvents.Join, "myRoom");
        // to make sure that the socket server has time to add socketClient to the room
        setTimeout(() => {
            server["socket"].emitMessageToRoom({messageType: gameMessageType.DIFFERENCE_FOUND, message: "You won!"}, "myRoom");
        },         TEN);
    });

    it("should be able to disconnect, send a request to remove the user and send a global message", (done: Mocha.Done) => {
        anotherSocketClient.on(SocketEvents.Message, (data: GameMessage) => {
            if (data.messageType === gameMessageType.DECONNEXION) {
                chai.expect(data.messageType).to.deep.equal(gameMessageType.DECONNEXION);
                chai.expect(data.message).to.contain("gorgie");
                chai.expect(usersService["users"].length).to.be.equal(0);
            }
            done();
        });
        socketClient.close();
    });

});
