import { JSON3DWrapper } from "./scene";

export interface AskUsernameMessage {
    username: string
}

export interface LoginMessage {
    usernameAccepted: boolean;
    errorMessage?: string;
}

export interface GameCreationMessage {
    gameCreated: boolean;
    errorMessage?: string;
}

export interface FreeGameCreationMessage {
    gameCreated: boolean;
    gameID: string;
    errorMessage?: string;
    lights?: THREE.DirectionalLight[];
    objectsOriginal?: JSON3DWrapper[];
}

export interface FreeGameCreationConfirmation {
    createGame: boolean;
    gameID: string;
    thumnail?: string;
}

export interface SimpleCoordinates {
    coord: {
        row: number;
        col: number;
    };
    gameSessionID: string;
    user: string;
}

export interface FreeID {
    objId: string;
    gameSessionID: string;
    user: string;
}

export interface CheckDifferencesMessage {
    differenceFound: boolean;
    differencesCount?: number;
    errorMessage?: string;
}

export enum GameType {Simple, Free};
export enum GameMod {Solo, Multi};

export interface NewGameSessionMessage {
    gameID: string;
    user: string;
    gameType: GameType;
}

export interface GameSessionCreationMessage {
    gameSessionCreated: boolean;
    simpleGameSession?: {
        name: string;
        id: string;
        originalImage: string;
        modifiedImage: string;
    };
    freeGameSession?: {
        name: string;
        id: string;
        objectsOriginal: JSON3DWrapper[];
        objectsModified: JSON3DWrapper[];
    }
    errorMessage?: string;
}

export interface MultiCreationMessage {
    gameSessionCreated: boolean;
    gameSessionId: string; 
}

export interface JoinGameSessionMessage {
    gameSessionId: string;
    user: string;
    gameType: GameType;
}

export interface UpdateGameMessage {
    gameId: string;
    gameType: GameType;
    newHighscores?: {
        soloHighscores: any[];  // We want to keep the Highscore interface in the server
        multiHighscores: any[];
    };
}

export interface QuitGameMessage {
    gameSessionId: string;
    gameType: GameType;
}

export interface MultiSession {
    gameId: string;
    gameSessionId: string;
}

export enum MultiEvent {Start, Difference, Quit};

export interface MultiMessage {
    event: MultiEvent;
    player: string;
    differenceCount: number;
    gameId?: string;
    objectId?: string;
    players?: string[];
}

