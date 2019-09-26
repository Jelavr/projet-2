import { expect } from "chai";
import { HighScore } from "../../../common/communication/card";
import { NB_DIFF_MULTI } from "../constantes";
import { GameGeneration } from "../game-generation/game-generation";
import { GameSession } from "./gameSession";

describe("Game session tests: ", () => {

    let gameSession: GameSession;
    const ERROR_CODE: number = 500;
    beforeEach(() => {
        const solo1: HighScore = {name: "blbla",
                                  time: {minutes: 0,
                                         seconds: 0.1, },
            };
        const solo2: HighScore = {name: "will",
                                  time: {minutes: 0,
                                         seconds: 0.2, },
        };
        const solo3: HighScore = {name: "antone",
                                  time: {minutes: 0,
                                         seconds: 0.3, },
        };

        gameSession = new GameSession(["ludo"], {
            _id: "",
            name: "myGame",
            thumbnail: "",
            soloHighScores: [solo1, solo2, solo3],
            multiHighScores: [solo1, solo2, solo3],
        },                            false);

    });

    it("Should create valid attributes on initialization", () => {
        gameSession = new GameSession(["ludovic"], {
            _id: "",
            name: "myGame",
            thumbnail: "",
            soloHighScores: GameGeneration.generateFakeHighScores(),
            multiHighScores: GameGeneration.generateFakeHighScores(),
        },                            false);
        gameSession.startGame();
        expect(gameSession.getUsers()[0] === "ludovic" && gameSession.getSessionId() !== undefined
        && gameSession.getNbDiffFound()["ludovic"] === 0).to.equal(true);
    });

    it("startGame should set the chrono start to current date and time", () => {
        gameSession.startGame();
        const currentTime: number = Date.now();
        expect(gameSession["chronoStart"] <= currentTime && gameSession["chronoStart"] > 0).to.equal(true);
    });

    it("endOfGame should measure the player's time", () => {
        gameSession.startGame();
        gameSession.endOfGame();
        expect(gameSession["time"] >= 0).to.equal(true);
    });

    it("getTime should return the time attribute of the game", () => {
        expect(gameSession["time"] === gameSession.getTime()).to.equal(true);
    });

    it("getGame should return the game attribute", () => {
        expect(gameSession["game"] === gameSession.getGame()).to.equal(true);
    });

    it("checkIfNewHighScore() should return false if the new score not better than the 3 best", async() => {
        gameSession.startGame();
        /* tslint:disable:no-any */
        await new Promise((resolve?: any) => void setTimeout(resolve, ERROR_CODE));
        const insert: number = gameSession.endOfGame();
        expect(insert).to.equal(-1);
    });

    it("checkIfNewHighScore() should change the Highscore with the new score", () => {
        gameSession.startGame();
        gameSession.endOfGame();
        expect(gameSession.getGame().soloHighScores[0].name).to.deep.equal("ludo");

    });

    it("should checkIfNewHighScore() should change the Highscore with the new score in multiplayer", () => {
        gameSession["isMulti"] = true;
        gameSession.startGame();
        gameSession["nbDiffFound"][gameSession["users"][0]] = NB_DIFF_MULTI;
        gameSession.endOfGame();

        expect(gameSession.getGame().multiHighScores[0].name).to.deep.equal("ludo");
    });

    it("checkIfNewHighScore() should return false if the new score not better than the 3 best in multi", async() => {
        gameSession["isMulti"] = true;
        gameSession.startGame();
        /* tslint:disable:no-any */
        await new Promise((resolve?: any) => void setTimeout(resolve, ERROR_CODE));
        const insert: number = gameSession.endOfGame();
        expect(insert).to.equal(-1);
    });

    it("method add should add a user to the array", () => {
        const name: string = "Vladimir Poutine loves Stephane";
        gameSession.addUser(name);
        expect(gameSession["users"].pop()).to.deep.equal(name);
    });

    it("method getFirstPlayerJoined should return a valid boolean", () => {
        expect(gameSession.getFirstPlayerJoined()).to.deep.equals(false);
    });

    it("method firstPlayerJoin should set the boolean firstPlayedJoined to true", () => {
        gameSession.firstPlayerJoin();
        expect(gameSession.getFirstPlayerJoined()).to.deep.equals(true);
    });
});
