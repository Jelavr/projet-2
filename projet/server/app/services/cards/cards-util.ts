import Axios, { AxiosResponse } from "axios";
import { Card, HighScore } from "../../../../common/communication/card";
import { GameType } from "../../../../common/communication/messages";
import { BASE_URL, DB_FREE_URL, DB_SIMPLE_URL, GET } from "../../constantes";
import { Game } from "../../game-generation/game";
import { DBAccessError } from "../customServiceErrors/dbAccessError";

export class CardsUtil {

    public static cards: Card[][] = [[], []];
    private static readonly NB_PLAYER: number = 3;

    public static orderPlayer(p: HighScore[]): void {
        for (let i: number = 0; i < CardsUtil.NB_PLAYER; i++) {
            for (let j: number = CardsUtil.NB_PLAYER - 1; j >= 0; j--) {
                if (i === j) {
                    break;
                } else if (p[i].time.minutes > p[j].time.minutes) {
                    const tmp: HighScore = p[i];
                    p[i] = p[j];
                    p[j] = tmp;
                    j = CardsUtil.NB_PLAYER;
                } else if (p[i].time.minutes === p[j].time.minutes && p[i].time.seconds > p[j].time.seconds) {
                    const tmp: HighScore = p[i];
                    p[i] = p[j];
                    p[j] = tmp;
                    j = CardsUtil.NB_PLAYER;
                }
            }
        }
    }

    public static generateCardFromGame(game: Game, gameType: GameType): Card {
        const card: Card = {
            gameID: "", gameType: GameType.Simple,
            name: "",
            logo: "",
            solo: new Array<HighScore>(),
            PVP: new Array<HighScore>(),
            joining: false,
        };
        card.name = game.name;
        card.gameType = gameType;
        card.gameID = game._id;
        card.logo = game.thumbnail;

        for (let i: number = 0; i < game.soloHighScores.length; i++) {
            card.solo[i] = {
                name: game.soloHighScores[i].name,
                time: game.soloHighScores[i].time,
            };
            card.PVP[i] = {
                name: game.multiHighScores[i].name,
                time: game.multiHighScores[i].time,
            };
        }

        CardsUtil.orderPlayer(card.solo);
        CardsUtil.orderPlayer(card.PVP);

        return card;
    }

    public static async initializeCards(): Promise<void> {
        let games: Game[];

        for (let i: number = 0 ; i <= 1 ; i++) {
            while (CardsUtil.cards[i].length) {
                CardsUtil.cards[i].pop();
              }
        }

        await Axios.get(BASE_URL + DB_SIMPLE_URL + GET).then((res: AxiosResponse<Game[]>) => {
            games = res.data;

            for (const game of games) {
                CardsUtil.cards[0].unshift(CardsUtil.generateCardFromGame(game, GameType.Simple));
            }
        }).catch(() => {
            throw new DBAccessError;
        });

        await Axios.get(BASE_URL + DB_FREE_URL + GET).then((res: AxiosResponse<Game[]>) => {
            games = res.data;

            for (const game of games) {
                CardsUtil.cards[1].unshift(CardsUtil.generateCardFromGame(game, GameType.Free));
            }
        }).catch(() => {
            throw new DBAccessError;
        });
    }
}
