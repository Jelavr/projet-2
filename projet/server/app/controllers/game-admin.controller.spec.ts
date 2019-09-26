import Axios, {AxiosResponse} from "axios";
import * as chai from "chai";
import spies = require("chai-spies");
import * as fs from "fs";
import * as supertest from "supertest";
chai.use(spies);
import { GameType, UpdateGameMessage } from "../../../common/communication/messages";
import {Application} from "../app";
import { DIF_IMG, GAMES, MOD_IMG, ORG_IMG } from "../constantes";
import { GameGeneration } from "../game-generation/game-generation";
import {container} from "../inversify.config";
import TYPES from "../types";

describe("Game Admin controller tests: ", () => {
    const okStatus: number = 200;
    const content: string = "Content-Type";
    let app: Express.Application;
    const sandbox: ChaiSpies.Sandbox = chai.spy.sandbox();

    beforeEach(() => {
        sandbox.on(Axios, "post", async (): Promise<AxiosResponse<string>> => {
            return new Promise<AxiosResponse<string>>((resolve: (value: AxiosResponse<string>) => void,
                                                       reject: (reason: string) => void) => {
                resolve({data: "",
                         status: okStatus,
                         statusText: "200 OK",
                         headers: "",
                         config: {}});
             });
        });
        sandbox.on(Axios, "put", async (): Promise<AxiosResponse<string>> => {
            return new Promise<AxiosResponse<string>>((resolve: (value: AxiosResponse<string>) => void,
                                                       reject: (reason: string) => void) => {
                    resolve({data: "",
                             status: okStatus,
                             statusText: "200 OK",
                             headers: "",
                             config: {}});
             });
        });
        app = container.get<Application>(TYPES.Application).app;
    });

    afterEach(() => {
        sandbox.restore();
    });
    it("POST /delete should delete a game of a given id.", async () => {
        const request: UpdateGameMessage = {
            gameId: "a",
            gameType: GameType.Simple,
          };
        chai.spy.on(fs, "unlinkSync");
        if (!fs.existsSync("./" + GAMES + request.gameId + "/")) {
            fs.mkdirSync("./" + GAMES + request.gameId + "/");
        }
        fs.writeFileSync("./" + GAMES + request.gameId + "/" + ORG_IMG, "");
        fs.writeFileSync("./" + GAMES + request.gameId + "/" + MOD_IMG, "");
        fs.writeFileSync("./" + GAMES + request.gameId + "/" + DIF_IMG, "");

        return supertest(app)
        .post("/admin/delete/")
        .send(request)
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response ) => {
            chai.expect(fs.unlinkSync).to.have.been.called();
            chai.spy.restore();
        });
    });

    it("POST /reset should create new random highScores by calling generateFakeHIghScores.", async () => {
        const request: UpdateGameMessage = {
            gameId: "a",
            gameType: GameType.Simple,
          };
        chai.spy.on(GameGeneration, "generateFakeHighScores");

        return supertest(app)
        .post("/admin/reset/")
        .send(request)
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response ) => {
            chai.expect(GameGeneration.generateFakeHighScores).to.have.been.called();
            chai.spy.restore();
        });
    });

});
