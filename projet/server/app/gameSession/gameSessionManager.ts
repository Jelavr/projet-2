import Axios, { AxiosResponse } from "axios";
import { gameCouldNotBeFound, notADiff, noGameSessionID } from "../../../common/communication/errorMessage";
import { GameMessage } from "../../../common/communication/gameMessage";
import gameMessageTypes from "../../../common/communication/gameMessageType";
import { CheckDifferencesMessage, GameSessionCreationMessage,
         GameType, MultiCreationMessage, MultiEvent, MultiMessage,
         MultiSession, UpdateGameMessage} from "../../../common/communication/messages";
import { BASE_URL, DB_FREE_URL, DB_SIMPLE_URL, GAMES,
         GET_FROM_ID, GLOBAL, JOIN, MOD_IMG, MSG, MULTI, NB_DIFF_MULTI, ORG_IMG, SESSIONS, SOCKET_URL, UPDATE } from "../constantes";
import { Game } from "../game-generation/game";
import { ImageUtil } from "../services/image/image-util";
import { FreeGameSession } from "./freeGameSession";
import { GameSession } from "./gameSession";
import { MessageManager } from "./messageManager/messageManager";
import { SimpleGameSession } from "./simpleGameSession";

export class GameSessionManager {
    public static sessions: GameSession[] = [];
    public static sessionsToJoin: GameSession[] = [];

    private static getGameSessionIdx(gameSessionID: string): number {
        return GameSessionManager.sessions.findIndex((gS: GameSession) => gS.getSessionId() === gameSessionID);
    }

    public static async newSoloGameSession(user: string, gameID: string, gameType: GameType): Promise<GameSessionCreationMessage> {
        const isSimpleGame: boolean = gameType === GameType.Simple;
        const DB: string = isSimpleGame ? DB_SIMPLE_URL : DB_FREE_URL;

        return Axios.put(BASE_URL + DB + GET_FROM_ID, {id: gameID}).then((res: AxiosResponse<Game>) => {
            const users: string[] = [];
            users.push(user);
            const gameSession: GameSession = isSimpleGame ? new SimpleGameSession(users, res.data, false)
                                                          : new FreeGameSession(users, res.data, false);
            GameSessionManager.sessions.push(gameSession);
            if (isSimpleGame) {

                return GameSessionManager.generateSimpleGSCM(gameSession);
            } else {
                return GameSessionManager.generateFreeGSCM(gameSession);
            }
        }).catch(() => {
            return gameCouldNotBeFound;
        });
    }

    public static async newMultiGameSession(gameID: string, gameType: GameType): Promise<MultiCreationMessage> {
        const isSimpleGame: boolean = gameType === GameType.Simple;
        const DB: string = isSimpleGame ? DB_SIMPLE_URL : DB_FREE_URL;

        return Axios.put(BASE_URL + DB + GET_FROM_ID, {id: gameID}).then((res: AxiosResponse<Game>) => {
            const users: string[] = [];
            const gameSession: GameSession = isSimpleGame ? new SimpleGameSession(users, res.data, true)
                                                          : new FreeGameSession(users, res.data, true);

            GameSessionManager.sessionsToJoin.push(gameSession);
            GameSessionManager.sendMultiSessions();

            return { gameSessionCreated: true, gameSessionId: gameSession.getSessionId() };
        }).catch(() => {
            return { gameSessionCreated: false, gameSessionId: "" };
        });
    }

    private static generateSimpleGSCM(gameSession: GameSession): GameSessionCreationMessage {
        const session: SimpleGameSession = gameSession as SimpleGameSession;

        return {
            gameSessionCreated: true,
            simpleGameSession: {
                name: session.getGame().name,
                id: session.getSessionId(),
                originalImage: BASE_URL + GAMES + session.getGame()._id + "/" + session.getSessionId() + "/" + ORG_IMG,
                modifiedImage: BASE_URL + GAMES + session.getGame()._id + "/" + session.getSessionId() + "/" + MOD_IMG,
            },
        };
    }

    private static generateFreeGSCM(gameSession: GameSession): GameSessionCreationMessage {
        const session: FreeGameSession = gameSession as FreeGameSession;

        return {
            gameSessionCreated: true,
            freeGameSession: {
                name: session.getGame().name,
                id: session.getSessionId(),
                objectsOriginal: session.getObjectsOriginal(),
                objectsModified: session.getObjectsModified(),
            },
        };
    }

    public static startGame(gameSessionID: string): boolean {
        const idx: number = GameSessionManager.getGameSessionIdx(gameSessionID);
        if (idx < 0) {
            return false;
        }
        if (GameSessionManager.sessions[idx].getIsMulti()) {
            if (GameSessionManager.sessions[idx].getFirstPlayerJoined()) {

                const start: MultiMessage = { event: MultiEvent.Start,
                                              differenceCount: 0,
                                              player: "",
                                              gameId: GameSessionManager.sessions[idx].getGame()._id,
                                              players: GameSessionManager.sessions[idx].getUsers()};
                GameSessionManager.sendMultiMessage(GameSessionManager.sessions[idx].getSessionId(), start);
                GameSessionManager.sessions[idx].startGame();

                return true;
            } else {
                GameSessionManager.sessions[idx].firstPlayerJoin();

                return false;
            }
        } else {
            GameSessionManager.sessions[idx].startGame();
        }

        return true;
    }

    public static async joinGameSession(user: string, gameSessionID: string, gameType: GameType): Promise<GameSessionCreationMessage> {
        const idx: number = GameSessionManager.sessionsToJoin.findIndex((gS: GameSession) => gS.getSessionId() === gameSessionID);
        const isSimpleGame: boolean = gameType === GameType.Simple;
        if (idx < 0) {
            return gameCouldNotBeFound;
        }
        const gameSession: GameSession = GameSessionManager.sessionsToJoin[idx];
        gameSession.addUser(user);
        if (gameSession.getUsers().length > 1) {
            GameSessionManager.sessions.push(gameSession);
            GameSessionManager.sessionsToJoin.splice(idx, 1);
            GameSessionManager.sendMultiSessions();
        } else {
            // send message to lobby, another user has joined
            Axios.post(BASE_URL + SOCKET_URL + MULTI + JOIN + gameSession.getSessionId());
        }

        if (isSimpleGame) {
            return GameSessionManager.generateSimpleGSCM(gameSession);
        } else {
            return GameSessionManager.generateFreeGSCM(gameSession);
        }
    }

    public static checkDifferences(gameSessionID: string, row: number, col: number, user: string): CheckDifferencesMessage {
        const idx: number = GameSessionManager.getGameSessionIdx(gameSessionID);
        if (idx < 0) {
            return noGameSessionID;
        }

        const session: SimpleGameSession = GameSessionManager.sessions[idx] as SimpleGameSession;

        const differenceFound: boolean = session.checkDifference(ImageUtil["HEIGHT"] - row - 1, col - 1, user);
        this.sendCheckMessage(differenceFound, session.getIsMulti() ? 1 + 1 : 1, session, user);

        if (differenceFound) {
            if (session.getIsMulti()) {
                const msg: MultiMessage = {
                    event: MultiEvent.Difference,
                    differenceCount: session.getNbDiffFound()[user],
                    player: user,
                };
                GameSessionManager.sendMultiMessage(session.getSessionId(), msg);
            }
            if (session.isFinished()) {
                this.winGame(session, GameType.Simple);
            }
        }

        return differenceFound ? {differenceFound: true, differencesCount: session.getNbDiffFound()[user]} : notADiff;
    }

    public static checkDifferences3D(gameSessionID: string, id: string, user: string): CheckDifferencesMessage {
        const idx: number = GameSessionManager.getGameSessionIdx(gameSessionID);
        if (idx < 0) {
            return noGameSessionID;
        }

        const session: FreeGameSession = GameSessionManager.sessions[idx] as FreeGameSession;

        const differenceFound: boolean = session.checkDifferences(id, user);
        this.sendCheckMessage(differenceFound, session.getIsMulti() ? 1 + 1 : 1, session, user);

        if (differenceFound) {
            if (session.getIsMulti()) {
                const msg: MultiMessage = {
                    event: MultiEvent.Difference,
                    differenceCount: session.getNbDiffFound()[user],
                    player: user,
                    objectId: id,
                };
                GameSessionManager.sendMultiMessage(session.getSessionId(), msg);
            }
            if (session.isFinished()) {
                this.winGame(session, GameType.Free);
            }
        }

        return differenceFound ? {differenceFound: true, differencesCount: session.getNbDiffFound()[user]} : notADiff;
    }

    private static winGame(session: GameSession, gameType: GameType): void {
        const newPosition: number = session.endOfGame();
        if (newPosition > 0) {
            const ourUpdateGameMessage: UpdateGameMessage = {
                gameId: session.getGame()._id,
                gameType: gameType,
                newHighscores: {
                    multiHighscores: session.getGame().multiHighScores,
                    soloHighscores: session.getGame().soloHighScores,
                },
            };
            const DB: string = gameType === GameType.Simple ? DB_SIMPLE_URL : DB_FREE_URL;
            Axios.post(BASE_URL + DB + UPDATE, ourUpdateGameMessage);

            let user: string = "";
            if (session.getIsMulti()) {
                session.getUsers().forEach((name: string) => {if (session.getNbDiffFound()[name] === NB_DIFF_MULTI) {user = name; }});
            } else {
                user = session.getUsers()[0];
            }
            const ourGameMessage: GameMessage = MessageManager.createBestTimeMessage(gameMessageTypes.BEST_TIME,
                                                                                     user,
                                                                                     newPosition.toString(),
                                                                                     session.getGame().name,
                                                                                     session.getIsMulti() ? "multijoueur" : "solo");
            GameSessionManager.sendGlobalMessage(ourGameMessage);
        }
    }

    public static quitGame(sessionId: string, gameType: GameType): void {
        let idx: number = GameSessionManager.getGameSessionIdx(sessionId);
        if (idx < 0) {
            idx = GameSessionManager.sessionsToJoin.findIndex((session: GameSession) => session.getSessionId() === sessionId);
            if (idx < 0) { return; }
            if (gameType === GameType.Simple) {
                const session: SimpleGameSession = GameSessionManager.sessionsToJoin[idx] as SimpleGameSession;
                session.quitGame();
            }
            GameSessionManager.sessionsToJoin.splice(idx, 1);

            return;
        }
        if (gameType === GameType.Simple) {
            const session: SimpleGameSession = GameSessionManager.sessions[idx] as SimpleGameSession;
            session.quitGame();
        }
        if (GameSessionManager.sessions[idx].getIsMulti()) {
            const msg: MultiMessage = {event: MultiEvent.Quit, differenceCount: 0, player: ""};
            GameSessionManager.sendMultiMessage(GameSessionManager.sessions[idx].getSessionId(), msg);
        }
        GameSessionManager.sessions.splice(idx, 1);
    }

    private static sendMultiMessage(room: string, msg: MultiMessage): void {
        Axios.post(BASE_URL + SOCKET_URL + MULTI + room, msg);
    }

    private static sendCheckMessage(differenceFound: boolean, nbPlayer: number, session: GameSession, user: string): void {
        const msgType: string = differenceFound ? gameMessageTypes.DIFFERENCE_FOUND : gameMessageTypes.IDENTIFICATION_ERROR;
        const ourGameMessage: GameMessage = differenceFound ?
                                            MessageManager.createDifferenceFoundMessage(msgType, nbPlayer, user) :
                                            MessageManager.createErrorMessage(msgType, nbPlayer, user);
        GameSessionManager.sendMessageToRoom(ourGameMessage, session.getSessionId());
    }

    public static sendGlobalMessage(msgToSend: GameMessage): void {
        Axios.post(BASE_URL + SOCKET_URL + MSG + GLOBAL, msgToSend);
    }

    private static sendMessageToRoom(msgToSend: GameMessage, room: string): void {
        Axios.post(BASE_URL + SOCKET_URL + MSG + room, msgToSend);
    }

    public static getMultiSessions(): MultiSession[] {
        const multiSessionsToSend: MultiSession[] = [];
        for (const session of GameSessionManager.sessionsToJoin) {
            const multi: MultiSession = {
                gameId: session.getGame()._id,
                gameSessionId: session.getSessionId(),
            };
            multiSessionsToSend.push(multi);
        }

        return multiSessionsToSend;
    }

    private static sendMultiSessions(): void {
        const multiSessionsToSend: MultiSession[] = GameSessionManager.getMultiSessions();

        Axios.post(BASE_URL + SOCKET_URL + MULTI + SESSIONS, multiSessionsToSend);
    }

    public static deletedGame(gameId: string): void {
        GameSessionManager.sessionsToJoin.forEach((session: GameSession) => {
            if (session.getGame()._id === gameId) {Axios.post(BASE_URL + SOCKET_URL + MULTI + JOIN + session.getSessionId() + "deleted"); }
        });
    }
}
