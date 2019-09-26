import {expect} from "chai";
import { Card, HighScore } from "../../../../common/communication/card";
import { GameType } from "../../../../common/communication/messages";
import { Game } from "../../game-generation/game";
import { CardsUtil } from "./cards-util";

describe("card-utils tests: ", async () => {

    const SECONDS1: number = 54;
    const SECONDS2: number = 9;

    const soloExemple: HighScore[] = [
        {name: "Mathieu", time: {minutes: 3, seconds: 54}  },
        {name: "Camille", time: {minutes: 4, seconds: 43}   },
        {name: "jean-mathieu", time: {minutes: 3, seconds: 51}  },
    ];

    const pVpExemple: HighScore[] = [
      {name: "Hello World", time: {minutes: 4, seconds: 9} },
      {name: "Batman", time: {minutes: 3, seconds: 46}  },
      {name: "Harambe", time: {minutes: 6, seconds: 56}   },
       ];

    const game: Game = {_id: "yesss",
                        name: "test1",
                        thumbnail: "https://images-na.ssl-images-amazon.com/images/I/61mcF%2BRXSQL._SX425_.jpg",
                        soloHighScores: soloExemple,
                        multiHighScores: pVpExemple};

    it("InitializeCards should remove existing cards if there are any", async () => {
        CardsUtil.cards[0].push({
            gameID: "", gameType: GameType.Simple,
            name: "",
            logo: "",
            solo: new Array<HighScore>(),
            PVP: new Array<HighScore>(),
            joining: false,
        });
        CardsUtil.initializeCards().then(() => {
            expect(CardsUtil.cards[0].length).to.be.equal(0);
            expect(CardsUtil.cards[1].length).to.be.equal(0);
        }).catch((err: Error) => {
            console.error(err.message);
        });
    });

    it("the table of high scores for solo should be in order", () => {
        CardsUtil.orderPlayer(soloExemple);
        expect(soloExemple[0].name).to.equal("jean-mathieu");
    });

    it("the table of high scores for multiplayer should be in order", () => {
        CardsUtil.orderPlayer(pVpExemple);
        expect(pVpExemple[1].name).to.equal("Hello World");
    });

    it("Make sure that the thumbnail is read when generateCardFromGame() is called", () => {
        const newCard: Card = CardsUtil.generateCardFromGame(game, GameType.Simple);
        expect(newCard.logo).to.not.equal("");
    });

    it("S'assure que le tableau des meuilleur temps solo est present et en ordre", () => {
        const newCard: Card = CardsUtil.generateCardFromGame(game, GameType.Simple);
        expect(newCard.solo[0].name).to.equal("jean-mathieu");
        expect(newCard.solo[1].time.seconds).to.equal(SECONDS1);
    });

    it("S'assure que le tableau des meuilleur temps un contre un est present et en odre", () => {
        const newCard: Card = CardsUtil.generateCardFromGame(game, GameType.Simple);
        expect(newCard.PVP[0].name).to.equal("Batman");
        expect(newCard.PVP[1].time.seconds).to.equal(SECONDS2);
    });

    it("Make sure that the type of game is correct when generateCardFromGame() is called", () => {
        const newCard: Card = CardsUtil.generateCardFromGame(game, GameType.Simple);
        expect(newCard.gameType).to.equal(GameType.Simple);
    });

});
