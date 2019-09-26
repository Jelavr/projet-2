import { HighScore } from "../../../common/communication/card";
import { NB_DIFF_MULTI } from "../constantes";
import { Game } from "../game-generation/game";
import { CardsUtil} from "../services/cards/cards-util";

export class GameSession {

    protected readonly TO_GET_SECONDS: number = 1000;
    protected readonly NB_PLAYER: number = 3;
    protected readonly SIXTY: number = 60;

    protected game: Game;
    protected sessionID: string;
    protected users: string[];
    protected chronoStart: number;
    protected time: number;
    protected nbDiffFound: {[user: string]: number};
    protected finished: boolean;
    protected isMulti: boolean;
    protected firstPlayerJoined: boolean;

    public constructor(users: string[], game: Game, isMulti: boolean) {
        this.game = game;
        this.sessionID = Date.now().toString();
        this.chronoStart = -1;
        this.time = -1;
        this.users = users;
        this.nbDiffFound = {};
        this.finished = false;
        this.isMulti = isMulti;
        this.firstPlayerJoined = false;
    }

    public getGame(): Game {
        return this.game;
    }

    public getSessionId(): string {
        return this.sessionID;
    }

    public getUsers(): string[] {
        return this.users;
    }

    public addUser(user: string): void {
        this.users.push(user);
    }

    public getTime(): number {
        return this.time;
    }

    public getNbDiffFound(): {[user: string]: number} {
        return this.nbDiffFound;
    }

    public getIsMulti(): boolean {
        return this.isMulti;
    }

    public getFirstPlayerJoined(): boolean {
        return this.firstPlayerJoined;
    }

    public firstPlayerJoin(): void {
        this.firstPlayerJoined = true;
    }

    public startGame(): void {
        this.users.forEach((user: string) => {
            this.nbDiffFound[user] = 0;
        });
        if (this.chronoStart < 0) {
            this.chronoStart = Date.now();
        }
    }

    public isFinished(): boolean {
        return this.finished;
    }

    public endOfGame(): number {
        this.time = (Date.now() - this.chronoStart) / this.TO_GET_SECONDS;

        return this.isMulti ? this.checkIfNewMultiHighScore() : this.checkIfNewSoloHighScore();
    }

    private checkIfNewSoloHighScore(): number {
        CardsUtil.orderPlayer(this.game.soloHighScores);
        const thirdScore: HighScore = this.game.soloHighScores[this.NB_PLAYER - 1];
        const thirdtime: number = thirdScore.time.minutes * this.SIXTY + thirdScore.time.seconds;
        if (this.time < thirdtime) {
            const min: number = Math.floor(this.time / this.SIXTY);
            const sec: number = Math.floor(this.time - min * this.SIXTY);
            const scoreuser: HighScore = {name : this.users[0],
                                          time : {minutes: min, seconds: sec}};
            this.game.soloHighScores[this.NB_PLAYER - 1] = scoreuser;
            CardsUtil.orderPlayer(this.game.soloHighScores);

            return this.game.soloHighScores.findIndex((h: HighScore) => h.name === scoreuser.name &&
                                                                        h.time.minutes === min && h.time.seconds === sec) + 1;
        } else {
            return -1;
        }
    }

    private checkIfNewMultiHighScore(): number {
        CardsUtil.orderPlayer(this.game.multiHighScores);
        const thirdScore: HighScore = this.game.multiHighScores[this.NB_PLAYER - 1];
        const thirdtime: number = thirdScore.time.minutes * this.SIXTY + thirdScore.time.seconds;
        if (this.time < thirdtime) {
            const min: number = Math.floor(this.time / this.SIXTY);
            const sec: number = Math.floor(this.time - min * this.SIXTY);
            const user: string = this.nbDiffFound[this.users[0]] === NB_DIFF_MULTI ? this.users[0] : this.users[1];
            const scoreuser: HighScore = {name : user,
                                          time : {minutes: min, seconds: sec}};
            this.game.multiHighScores[this.NB_PLAYER - 1] = scoreuser;
            CardsUtil.orderPlayer(this.game.multiHighScores);

            return this.game.multiHighScores.findIndex((h: HighScore) => h.name === scoreuser.name &&
                                                                        h.time.minutes === min && h.time.seconds === sec) + 1;
        } else {
            return -1;
        }
    }

}
