import Axios, { AxiosResponse} from "axios";
import * as chai from "chai";
import spies = require("chai-spies");
chai.use(spies);
import * as sinon from "sinon";
import { GameMessage } from "../../../common/communication/gameMessage";
import { GameSessionCreationMessage, GameType } from "../../../common/communication/messages";
import { JSON3DWrapper } from "../../../common/communication/scene";
import { FreeGame, Game, SimpleGame } from "../game-generation/game";
import { GameGeneration } from "../game-generation/game-generation";
import { ImageUtil } from "../services/image/image-util";
import { FreeGameSession } from "./freeGameSession";
import { GameSession } from "./gameSession";
import { GameSessionManager } from "./gameSessionManager";
import { SimpleGameSession } from "./simpleGameSession";

describe("Game session Manager tests: ", () => {

    const okStatus: number = 200;
    let gS1: GameSession;
    let gS2: GameSession;
    let gS3: GameSession;
    let id1: string;
    let onpost: boolean = false;

    const sandbox: ChaiSpies.Sandbox = chai.spy.sandbox();

    const mockFreeGame2: FreeGame = {
        _id: "3",
        name: "free2",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
        objets: {objectsOriginal: new Array<JSON3DWrapper>(),
                 objectsModified: new Array<JSON3DWrapper>(), },
    };

    const mockSimpleGame: SimpleGame = {
        _id: "5",
        name: "simple",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
        originalImage: "",
        modifiedImage: "",
        differences: "",
    };

    gS1 = new GameSession(["ludo"], {
        _id: "1",
        name: "myGame",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
    },                    false);

    const mockFreeGame: FreeGame = {
        _id: "2",
        name: "free",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
        objets: {objectsOriginal: new Array<JSON3DWrapper>(),
                 objectsModified: new Array<JSON3DWrapper>(), },
    };

    gS2 = new FreeGameSession(["testfree"], mockFreeGame, false);

    const mockGame: Game = {
        _id: "3",
        name: "simple",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
    };

    gS3 = new GameSession(["test"], mockGame, false);

    beforeEach( () => {
        sandbox.on(Axios, "put", async (): Promise<AxiosResponse<Game>> => {
            return new Promise<AxiosResponse<Game>> ((resolve: (value: AxiosResponse<Game>) => void,
                                                      reject: (reason: string) => void) => {
                resolve ({data: gS1.getGame(),
                          status: okStatus,
                          statusText : "200 OK",
                          headers : "",
                          config: {}});
            });
        });
        sandbox.on(Axios, "post", (): void => {
            onpost = true;
            });
        sandbox.on(ImageUtil, "readFile", (): void => {return; },
        );
        sandbox.on(ImageUtil, "writeImageToDisk", (): void => {return; },
        );
        GameSessionManager.sessions = [gS1, gS2, gS3];
        id1 = GameSessionManager.sessions[0].getSessionId();
    });

    afterEach( () => {
        sandbox.restore();
        onpost = false;
      });

    it("Should return the id of the session with call to getGameSessionIdx()", () => {
        const tmp2: number = GameSessionManager["getGameSessionIdx"](id1);
        chai.expect(tmp2).to.equal(0);
    });

    it("Should start the right game", () => {
        chai.expect(GameSessionManager.startGame(id1)).to.equal(true);
    });

    it("Should create a new SimpleGameSession with newGameSession()", async() => {
        const user: string = "wival";
        const type: GameType = GameType.Simple;
        GameSessionManager.newSoloGameSession(user, id1, type)
        .then(
            (res: GameSessionCreationMessage) => chai.expect(res.gameSessionCreated).to.be.equal(true),
        ).catch((error: Error) => console.error(error.message));

    });

    it("Should create a new FreeGameSession", () => {
        const res: GameSessionCreationMessage = GameSessionManager["generateFreeGSCM"](gS2);
        if (res.freeGameSession) {
        chai.expect(res.freeGameSession.name).to.be.equal("free");
        }

    });

    it("Should send a global Message correctly", () => {
        const tmp: GameMessage = {
            messageType: "test",
            message: "testtest",
            };
        GameSessionManager.sendGlobalMessage(tmp);
        chai.expect(onpost).to.be.equal(true);

   });

    it("Should send a Message to a room correctly", () => {
        const tmp: GameMessage = {
            messageType: "test",
            message: "testtest",
            };
        GameSessionManager["sendMessageToRoom"](tmp, "room");
        chai.expect(onpost).to.be.equal(true);

    });

    it("Should SendChekMessage", () => {
        chai.spy.on(GameSessionManager, "sendMessageToRoom");
        GameSessionManager["sendCheckMessage"](true, 1, gS1, "solo");
        chai.expect(GameSessionManager["sendMessageToRoom"]).to.have.been.called();
    });

    it("Should quit the free game", () => {
        chai.spy.on(GameSessionManager.sessions, "splice");
        GameSessionManager.quitGame(id1, GameType.Free);
        chai.expect(GameSessionManager.sessions.splice).to.have.been.called();
    });

    it("Should quit the simple game", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, false);
        GameSessionManager.sessions.push(gS4);
        const id4: string = gS4.getSessionId();
        chai.spy.on(gS4, "quitGame", () => {return; });
        GameSessionManager.quitGame(id4, GameType.Simple);
        chai.expect(gS4.quitGame).to.have.been.called();
    });

    it("Should check the difference in 2D correctly", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, false);
        GameSessionManager.sessions.push(gS4);
        const id4: string = gS4.getSessionId();
        chai.spy.on(gS4, "checkDifference", () => true);
        chai.expect(GameSessionManager.checkDifferences(id4, 1, 1, "testsimple").differenceFound).to.be.equal(true);

    });

    it("Should check the difference in 3D correctly", () => {
        const gS5: FreeGameSession = new FreeGameSession(["testfree2"], mockFreeGame2, false);
        GameSessionManager.sessions.push(gS5);
        const id2: string = gS5.getSessionId();
        chai.spy.on(gS5, "checkDifferences", () => true);
        chai.expect(GameSessionManager.checkDifferences3D(id2, "1", "testfree2").differenceFound).to.be.equal(true);

    });

    it("Should win the game and send a message", () => {
        chai.spy.on( GameSessionManager.sessions[1], "endOfGame", () => 1);
        chai.spy.on(GameSessionManager, "sendGlobalMessage");
        GameSessionManager["winGame"](GameSessionManager.sessions[1], GameType.Free);
        chai.expect(GameSessionManager.sendGlobalMessage).to.have.been.called();
    });

    it("Should create a new SimpleGameSession with newGameSession() with simple game type", async() => {
        const user: string = "wival";
        const type: GameType = GameType.Simple;
        GameSessionManager.newSoloGameSession(user, id1, type)
        .then(
            (res: GameSessionCreationMessage) => chai.expect(res.gameSessionCreated).to.be.equal(true),
        ).catch((error: Error) => console.error(error.message));

    });

    it("Should create a new FreeGameSession with newGameSession() with Free game type", async() => {
        sandbox.restore();
        sandbox.on(Axios, "put", async (): Promise<AxiosResponse<Game>> => {
            return new Promise<AxiosResponse<Game>> ((resolve: (value: AxiosResponse<Game>) => void,
                                                      reject: (reason: string) => void) => {
                resolve ({data: gS2.getGame(),
                          status: okStatus,
                          statusText : "200 OK",
                          headers : "",
                          config: {}});
            });
        });
        const user: string = "ludo";
        const type: GameType = GameType.Free;
        id1 = GameSessionManager.sessions[1].getSessionId();
        GameSessionManager.newSoloGameSession(user, id1, type)
        .then(
            (res: GameSessionCreationMessage) => chai.expect(res.gameSessionCreated).to.be.equal(true),
        ).catch((error: Error) => console.error(error.message));
    });

    it("Should create an exception when the params are not consistents with newGameSession() ", async() => {
        const user: string = "ludo";
        const type: GameType = GameType.Free;
        id1 = GameSessionManager.sessions[1].getSessionId();
        GameSessionManager.newSoloGameSession(user, id1, type)
        .then(
            (res: GameSessionCreationMessage) => chai.expect(res.gameSessionCreated).to.be.equal(false),
        ).catch((error: Error) => console.error(error.message));
    });

    it("Should create an exception when the params are not consistents with newMultiGameSession() ", async() => {
        const type: GameType = GameType.Free;
        id1 = GameSessionManager.sessions[1].getSessionId();
        GameSessionManager.newMultiGameSession(id1, type)
        .then(
            (res: GameSessionCreationMessage) => chai.expect(res.gameSessionCreated).to.be.equal(false),
        ).catch((error: Error) => console.error(error.message));
    });

    it("Should create a new FreeGameSession with newMultiGameSession() with Free game type ", async() => {
        sandbox.restore();
        sandbox.on(Axios, "put", async (): Promise<AxiosResponse<Game>> => {
            return new Promise<AxiosResponse<Game>> ((resolve: (value: AxiosResponse<Game>) => void,
                                                      reject: (reason: string) => void) => {
                resolve ({data: gS2.getGame(),
                          status: okStatus,
                          statusText : "200 OK",
                          headers : "",
                          config: {}});
            });
        });
        const type: GameType = GameType.Free;
        id1 = GameSessionManager.sessions[1].getSessionId();
        GameSessionManager.newMultiGameSession(id1, type)
        .then(
            (res: GameSessionCreationMessage) => chai.expect(res.gameSessionCreated).to.be.equal(true),
        ).catch((error: Error) => console.error(error.message));
    });

    it("Should create a new FreeGameSession with newMultiGameSession() with simple game type ", async() => {
        const type: GameType = GameType.Simple;
        id1 = GameSessionManager.sessions[0].getSessionId();
        GameSessionManager.newMultiGameSession(id1, type)
        .then(
            (res: GameSessionCreationMessage) => chai.expect(res.gameSessionCreated).to.be.equal(true),
        ).catch((error: Error) => console.error(error.message));
    });

    it("Method startGame should return false when the game ID is invalid", () => {
        chai.expect(GameSessionManager.startGame("safwqag")).to.be.equal(false);
    });

    it("Method startGame should return true when the game ID is valid and it is a simple player game", () => {
        chai.expect(GameSessionManager.startGame(id1)).to.be.equal(true);
    });

    it("Method startGame should return true when the game ID is valid and it is a multi player game", () => {
        chai.expect(GameSessionManager.startGame(id1)).to.be.equal(true);
    });

    it("Method startGame should return false when the game ID is valid and it is a multi player game but its the first player", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, true);
        GameSessionManager["sessions"].push(gS4);
        chai.expect(GameSessionManager.startGame(gS4.getSessionId())).to.be.equal(false);
    });

    it("Method startGame should return true when the game ID is valid and it is a multi player game but its not first player", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, true);
        gS4.firstPlayerJoin();
        GameSessionManager["sessions"].push(gS4);
        chai.expect(GameSessionManager.startGame(gS4.getSessionId())).to.be.equal(true);
    });

    it("Method JoinGameSession should return gameCouldNotBeFound if the game doesnt exist", () => {
        GameSessionManager.joinGameSession("user", "fakeID", GameType.Free).then( (res: GameSessionCreationMessage) => {
            chai.expect(res.gameSessionCreated).to.be.equal(false);
        }).catch();
    });

    it("Method JoinGameSession should return that the free game exist (true)", () => {
        const gS4: FreeGameSession = new FreeGameSession(["testsimple"], mockFreeGame2, true);
        GameSessionManager["sessionsToJoin"].push(gS4);
        GameSessionManager.joinGameSession("user", gS4.getSessionId(), GameType.Free)
        .then( (res: GameSessionCreationMessage) => {
            chai.expect(res.gameSessionCreated).to.be.equal(true);
        }).catch();
    });

    it("Method deletedGame should be called without problems", () => {
        chai.spy.on(GameSessionManager, "deletedGame");
        GameSessionManager.deletedGame("randomID");
        chai.expect(GameSessionManager.deletedGame).to.have.been.called();
    });

    it("Method JoinGameSession should return that the simple game exist (true)", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, true);
        gS4["users"].pop();
        GameSessionManager["sessionsToJoin"].push(gS4);
        GameSessionManager.joinGameSession("user", gS4.getSessionId(), GameType.Simple)
        .then( (res: GameSessionCreationMessage) => {
            chai.expect(res.gameSessionCreated).to.be.equal(true);
        }).catch();
    });

    it("method CheckDifferences should return NoGameSessionID when an invalid game ID is passed", () => {
        chai.expect(GameSessionManager.checkDifferences("randomID", 1, 1, "randomuser").errorMessage)
        .to.be.equal("The game session ID is invalid!");
    });

    it("method checkDifference should return true when there is  a difference", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, true);
        gS4["isMulti"] = true;
        GameSessionManager["sessions"].push(gS4);
        const stub: sinon.SinonStub = sinon.stub(SimpleGameSession.prototype, "checkDifference");
        stub.returns(true);
        chai.expect(GameSessionManager.checkDifferences(gS4.getSessionId(), 1, 1, "randomuser").differenceFound).to.be.equal(true);
        stub.restore();
    });

    it("Method checkDifference should call winGame when all differences are found", () => {
        chai.spy.on(GameSessionManager, "winGame");
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, true);
        gS4["isMulti"] = true;
        GameSessionManager["sessions"].push(gS4);
        const stub: sinon.SinonStub = sinon.stub(SimpleGameSession.prototype, "checkDifference");
        stub.returns();
        gS4["finished"] = true;
        GameSessionManager.checkDifferences(gS4.getSessionId(), 1, 1, "randomuser");
        chai.expect(GameSessionManager["winGame"]).to.have.been.called();
        stub.restore();
    });

    it("method CheckDifferences3D should return NoGameSessionID when an invalid game ID is passed", () => {
        chai.expect(GameSessionManager.checkDifferences3D("randomID", "randomobjId", "randomUser").errorMessage)
        .to.be.equal("The game session ID is invalid!");
    });

    it("Method checkDifference3D should call winGame when all differences are found", () => {
        const gS4: FreeGameSession = new FreeGameSession(["testsimple"], mockFreeGame, true);
        gS4["isMulti"] = true;
        gS4["finished"] = true;
        GameSessionManager["sessions"].push(gS4);
        const stub: sinon.SinonStub = sinon.stub(FreeGameSession.prototype, "checkDifferences");
        stub.returns(true);
        const endgameStub: sinon.SinonStub = sinon.stub(FreeGameSession.prototype, "endOfGame");
        endgameStub.returns(1);
        GameSessionManager.checkDifferences3D(gS4.getSessionId(), "randomobjID", "randomUser");
        chai.expect(GameSessionManager["winGame"]).to.have.been.called();
        stub.restore();
    });

    it("method quitGame should remove the game from the array game to join array", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, true);
        gS4["isMulti"] = true;
        GameSessionManager["sessionsToJoin"].push(gS4);
        const stub: sinon.SinonStub = sinon.stub(SimpleGameSession.prototype, "quitGame");
        stub.returns(1);
        GameSessionManager.quitGame(gS4.getSessionId(), GameType.Simple);
        chai.expect(GameSessionManager["sessionsToJoin"].pop()).to.not.equal(gS4);
        stub.restore();
    });

    it("method quitGame should remove the game from the array session array", () => {
        const gS4: SimpleGameSession = new SimpleGameSession(["testsimple"], mockSimpleGame, true);
        gS4["isMulti"] = true;
        GameSessionManager["sessions"].push(gS4);
        const stub: sinon.SinonStub = sinon.stub(SimpleGameSession.prototype, "quitGame");
        stub.returns(1);
        GameSessionManager.quitGame(gS4.getSessionId(), GameType.Simple);
        chai.expect(GameSessionManager["sessions"].pop()).to.not.equal(gS4);
        stub.restore();
    });

    it("method quitGame should do nothing when the id is random", () => {
        const length: number = GameSessionManager["sessionsToJoin"].length;
        GameSessionManager.quitGame("randomID", GameType.Simple);
        chai.expect(GameSessionManager["sessionsToJoin"].length).to.be.deep.equal(length);
    });

// tslint:disable-next-line:max-file-line-count
});
