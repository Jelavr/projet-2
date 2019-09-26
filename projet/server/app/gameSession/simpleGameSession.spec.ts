import * as chai from "chai";
import spies = require("chai-spies");
chai.use(spies);
import * as fs from "fs";
import { BASE_URL, DIF_IMG, GAMES, MOD_IMG, ORG_IMG, TEST_SIMPLE } from "../constantes";
import { SimpleGame } from "../game-generation/game";
import { GameGeneration } from "../game-generation/game-generation";
import { SimpleGameSession } from "./simpleGameSession";

describe("simpleGameSession Tests: ", () => {

    const user: string = "zorro";
    const simpleGame: SimpleGame = {
        _id: "",
        name: "myGame",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
        differences: "", modifiedImage: "", originalImage: "",
    };
    simpleGame.originalImage = BASE_URL + GAMES + TEST_SIMPLE + ORG_IMG;
    simpleGame.modifiedImage = BASE_URL + GAMES + TEST_SIMPLE + MOD_IMG;
    simpleGame.differences = BASE_URL + GAMES + TEST_SIMPLE + DIF_IMG;
    simpleGame._id = "testSimple";
    const simpleGameSession: SimpleGameSession = new SimpleGameSession([user], simpleGame, false);
    simpleGameSession.getNbDiffFound()[user] =  1 + 1 + 1 + 1 + 1;

    it("Should create successfully when given valid parameters.", () => {
        let fileExists: boolean = true;
        if (!fs.existsSync("./app/games/testSimple/" + simpleGameSession.getSessionId().toString() + "/" + ORG_IMG)) {
            fileExists = false;
        }
        if (!fs.existsSync("./app/games/testSimple/" + simpleGameSession.getSessionId().toString() + "/" + MOD_IMG)) {
            fileExists = false;
        }
        chai.expect(fileExists).to.deep.equal(false);
    });

    it("checkDifference should return true if the coordinate is a difference", () => {
        const ROW: number = 444;
        const COL: number = 558;
        chai.expect(simpleGameSession.checkDifference(ROW, COL, user)).to.be.equal(true);
    });

    it("checkDifference should return false if the coordinate is not a difference", () => {
        chai.expect(simpleGameSession.checkDifference(0, 0, user)).to.be.equal(false);
    });

    it("should erase the temporary files when the diff counter hit 7.", () => {
        const ROW: number = 31;
        const COL: number = 386;
        simpleGameSession.checkDifference(ROW, COL, user);
        chai.expect(fs.existsSync("./app/games/" + simpleGameSession["game"]._id +
         "/" + simpleGameSession.getSessionId())).to.be.equal(false);
    });

    it("should delete the files when you quit the game", () => {
        chai.spy.on(fs, "unlinkSync");
        simpleGameSession.quitGame();
        chai.expect(fs.unlinkSync).to.have.been.called();
    });
});
