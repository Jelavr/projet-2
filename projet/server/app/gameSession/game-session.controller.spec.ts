import Axios, { AxiosResponse} from "axios";
import * as chai from "chai";
import spies = require("chai-spies");
chai.use(spies);
import * as fs from "fs";
import * as supertest from "supertest";
import { GameSessionCreationMessage,
    GameType, NewGameSessionMessage } from "../../../common/communication/messages";
import {Application} from "../app";
import { DIF_IMG, GAMES, IMAGES, MOD_IMG, ORG_IMG, TEST, TESTS } from "../constantes";
import { Game, SimpleGame } from "../game-generation/game";
import { GameGeneration } from "../game-generation/game-generation";
import {container} from "../inversify.config";
import { ImageUtil } from "../services/image/image-util";
import TYPES from "../types";

describe("Game Session Controller Tests :", async () => {
    const okStatus: number = 200;
    const url: string = "/session";
    const content: string = "Content-Type";
    let app: Express.Application;
    const sandbox: ChaiSpies.Sandbox = chai.spy.sandbox();
    const game: SimpleGame = {
        _id: "",
        name: "myGame",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
        differences: "", modifiedImage: "", originalImage: "",
    };

    game._id = "test";

    beforeEach(() => {
        app = container.get<Application>(TYPES.Application).app;
        sandbox.on(Axios, "put", async (): Promise<AxiosResponse<Game>> => {
            return new Promise<AxiosResponse<Game>>((resolve: (value: AxiosResponse<Game>) => void,
                                                     reject: (reason: string) => void) => {
                resolve({data: game,
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

    it("Should create a new GameSession when given valid parameters.", async () => {
        ImageUtil.writeImageToDisk("./" + GAMES + TEST, ORG_IMG,
                                   ImageUtil.generateImageFromBuffer(fs.readFileSync("./app/" + TESTS + IMAGES + "original7.bmp")));
        ImageUtil.writeImageToDisk("./" + GAMES + TEST, DIF_IMG,
                                   ImageUtil.generateImageFromBuffer(fs.readFileSync("./app/" + TESTS + IMAGES + "original7.bmp")));
        ImageUtil.writeImageToDisk("./" + GAMES + TEST, MOD_IMG,
                                   ImageUtil.generateImageFromBuffer(fs.readFileSync("./app/" + TESTS + IMAGES + "original7.bmp")));
        const request: NewGameSessionMessage = {gameID: "test", user: "ludovic", gameType: GameType.Simple};

        return supertest(app)
        .put(url + "/new")
        .send(request)
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response ) => {

            const res: GameSessionCreationMessage = response.body as GameSessionCreationMessage;
            chai.expect((res).gameSessionCreated).to.deep.equal(true);
        });

    });
} );
