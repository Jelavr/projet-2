import Axios, { AxiosResponse} from "axios";
import * as chai from "chai";
import spies = require("chai-spies");
chai.use(spies);
import { HighScore } from "../../../common/communication/card";
import { Game, SimpleGame } from "./game";
import { GameGeneration } from "./game-generation";

describe("GameGeneration tests", () => {
    const okStatus: number = 200;
    const sandbox: ChaiSpies.Sandbox = chai.spy.sandbox();

    beforeEach(() => {
        sandbox.on(Axios, "post", async (): Promise<AxiosResponse<string>> => {
            return new Promise<AxiosResponse<string>>((resolve: (value: AxiosResponse<string>) => void,
                                                       reject: (reason: string) => void) => {
                resolve({data: "unBelId",
                         status: okStatus,
                         statusText: "200 OK",
                         headers: "",
                         config: {}});
             });
        });
    });

    afterEach( () => {
        sandbox.restore();
    });

    const genService: GameGeneration = new GameGeneration();
    const game: Game = genService.generateGame("ludo", true);
    it("generateFakeHighScores should generate a filled array of high scores.", () => {
        chai.expect(GameGeneration["generateFakeHighScores"]().length).to.be.not.equal(0);
    });

    it("generateGame should generate a game with name and type", () => {
        const simple: SimpleGame = {
            _id: "",
            name: "",
            thumbnail: "",
            soloHighScores: Array<HighScore>(),
            multiHighScores: Array<HighScore>(),
            differences: "", modifiedImage: "", originalImage: "",
        };
        chai.expect(game.name === "ludo" && typeof(game) === typeof(simple)
        && game.multiHighScores.length !== 0 && game.soloHighScores.length !== 0).to.be.equal(true);
    });

    it("sendToDataBase should send to dataBase and return a creation message", () => {
        genService.sendToDataBase(game, true).then((id: string) => {
            chai.expect(id).to.be.deep.equal("unBelId");
        })
        .catch((err: Error) => {
            console.error(err.message);
        });
    });
});
