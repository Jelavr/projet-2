import { GameType } from "./messages";

export interface HighScore {
    name: string;
    time: {minutes: number,
           seconds: number,};
}

export interface Card {
    gameID: string;
    gameType: GameType;
    name: string;
    logo: string;
    solo: HighScore[];
    PVP: HighScore[];
    joining: boolean;
}

export interface CardInfo {
    gameID: string;
    name: string;
    gameType: GameType;
}
