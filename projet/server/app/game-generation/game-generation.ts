import Axios, { AxiosResponse } from "axios";
import { HighScore } from "../../../common/communication/card";
import { ADD_GAME, BASE_URL, DB_FREE_URL, DB_SIMPLE_URL } from "../constantes";
import { DBAccessError } from "../services/customServiceErrors/dbAccessError";
import { FreeGame, Game, SimpleGame } from "./game";

export class GameGeneration {
    private static readonly MOCK_NOMS: string[] = ["Ludovic", "Jeffrey", "William"];
    private static readonly NB_PLAYER: number = 3;
    private static readonly MAX_TIME_RANDOM: number = 300;
    private static readonly MIN_TIME_RANDOM: number = 200;
    private static readonly NBR_SECONDS: number = 60;

    public static generateFakeHighScores(): HighScore[] {
        const highscores: HighScore[] = [];
        for (let i: number = 0 ; i < GameGeneration.NB_PLAYER ; i++) {
            const tSolo: number = GameGeneration.MIN_TIME_RANDOM +
            ((GameGeneration.MAX_TIME_RANDOM - GameGeneration.MIN_TIME_RANDOM) * Math.random());
            const minSolo: number = Math.floor(tSolo / GameGeneration.NBR_SECONDS);
            let secSolo: number = tSolo % GameGeneration.NBR_SECONDS;
            secSolo = Math.round(secSolo);

            highscores.push({name: GameGeneration.MOCK_NOMS[i],
                             time: {minutes: minSolo,
                                    seconds: secSolo}});
        }

        return highscores;
    }

    public generateGame(name: string, isSimpleGame: boolean): Game {
        if (isSimpleGame) {
            let game: SimpleGame;
            game = {
                _id: "",
                name: name,
                thumbnail: "",
                soloHighScores: GameGeneration.generateFakeHighScores(),
                multiHighScores: GameGeneration.generateFakeHighScores(),
                differences: "", modifiedImage: "", originalImage: "",
            };

            return game;
        } else {
            let game: FreeGame;
            game = {
                _id: "",
                name: name,
                thumbnail: "",
                soloHighScores: GameGeneration.generateFakeHighScores(),
                multiHighScores: GameGeneration.generateFakeHighScores(),
                objets: {objectsModified: [], objectsOriginal: []},
            };

            return game;
        }
    }

    public async sendToDataBase(game: Game, isSimpleGame: boolean): Promise<string> {
        const DB: string = isSimpleGame ? DB_SIMPLE_URL : DB_FREE_URL;

        return Axios.post(BASE_URL + DB + ADD_GAME, game).then((res: AxiosResponse<string>) => {
            return res.data;
        }).catch(() => {
            throw new DBAccessError;
        });
    }
}
