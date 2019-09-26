import Axios, { AxiosResponse } from "axios";
import { Server } from "http";
import { injectable } from "inversify";
import * as socketIo from "socket.io";
import { GameMessage } from "../../../../common/communication/gameMessage";
import gameMessageTypes from "../../../../common/communication/gameMessageType";
import { MultiMessage, MultiSession } from "../../../../common/communication/messages";
import SocketEvents from "../../../../common/communication/socketEvents";
import { User } from "../../../../common/communication/user";
import { ADD, BASE_URL, REMOVE, USERS } from "../../constantes";
import { MessageManager } from "../../gameSession/messageManager/messageManager";
import { CardsUtil } from "../cards/cards-util";

@injectable()
export class SocketService {

    private io: SocketIO.Server;

    public createSocket(server: Server): void {
        this.io = socketIo(server);
    }

    public listen(): void {
        this.io.on(SocketEvents.Connect, (socket: SocketIO.Socket) => {

            let user: User;
            socket.on(SocketEvents.Initialisation, (m: string) => {
                user = {username: JSON.parse(m).username};
                this.addUser(socket, user);
            });

            socket.on(SocketEvents.Disconnect, () => {
                if (user !== undefined) { this.removeUser(socket, user); }
            });

            socket.on(SocketEvents.LoadGames, () => {
                this.sendGames();
            });

            socket.on(SocketEvents.Join, (room: string) => {
                socket.join(room);
            });
        });
    }

    private sendGames(): void {
        CardsUtil.initializeCards().then(() => {
            this.io.emit(SocketEvents.LoadGames, CardsUtil.cards);
        }).catch(() => {
            this.io.emit(SocketEvents.LoadGames, CardsUtil.cards);
            console.error("The cards were not correctly initialized");
        });
    }

    private addUser(socket: SocketIO.Socket, user: User): void {
        Axios.post(BASE_URL + USERS + ADD, user).then((response: AxiosResponse<number>) => {
            socket.emit(SocketEvents.Initialisation, response.data);
            this.emitGlobalMessage(MessageManager.createConnexionMessage(gameMessageTypes.CONNEXION, user.username));
        }).catch(() => console.error("The HTTP request to the users service failed to add the user " + user.username));
    }

    private removeUser(socket: SocketIO.Socket, user: User): void {
        Axios.put(BASE_URL + USERS + REMOVE, user).then(() => {
            this.emitGlobalMessage(MessageManager.createDeconnexionMessage(gameMessageTypes.DECONNEXION, user.username));
        }).catch(() => console.error("The HTTP request to the users service failed to remove the user " + user.username));
    }

    public sendMultiMsgToRoom(room: string, message: MultiMessage): void {
        this.io.to(room).emit(SocketEvents.MultiDiff, message);
    }

    public sendMultiSessions(sessions: MultiSession[]): void {
        this.io.emit(SocketEvents.Multi, sessions);
    }

    public sendToLobby(sessionId: string): void {
        this.io.emit(SocketEvents.JoinedSession, sessionId);
    }

    public emitGlobalMessage(msg: GameMessage): void {
        this.io.emit(SocketEvents.Message, msg);
    }

    public emitMessageToRoom(msg: GameMessage, room: string): void {
        this.io.to(room).emit(SocketEvents.Message, msg);
    }
}
