import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";
import { injectable } from "inversify";
import { GameType,
         UpdateGameMessage} from "../../../common/communication/messages";
import { DELETE_GAME_ERROR, RESET_GAME_ERROR } from "../../../common/constants/errorHTTPCodes";
import { BASE_URL, DB_FREE_URL, DB_SIMPLE_URL, DELETED, DIF_IMG, DROP, GAMES, MOD_IMG, ORG_IMG, SESSION, UPDATE } from "../constantes";
import { GameGeneration } from "../game-generation/game-generation";

@injectable()
export class GameAdminController {

    public get router(): Router {
        const router: Router = Router();

        router.post("/delete",
                    (req: Request, res: Response, next: NextFunction) => {
            const gameToDelete: UpdateGameMessage = req.body as UpdateGameMessage;
            const DB: string = gameToDelete.gameType === GameType.Simple ? DB_SIMPLE_URL : DB_FREE_URL;
            if (gameToDelete.gameType === GameType.Simple) {
                fs.unlinkSync("./" + GAMES + gameToDelete.gameId + "/" + ORG_IMG);
                fs.unlinkSync("./" + GAMES + gameToDelete.gameId + "/" + MOD_IMG);
                fs.unlinkSync("./" + GAMES + gameToDelete.gameId + "/" + DIF_IMG);
                if (fs.readdirSync("./" + GAMES + gameToDelete.gameId).length === 0) {
                    fs.rmdirSync("./" + GAMES + gameToDelete.gameId);
                }
            }
            Axios.post(BASE_URL + DB + DROP, gameToDelete)
            .then(() => {
                Axios.put(BASE_URL + SESSION + DELETED + gameToDelete.gameId).then(() => {
                    res.json();
                }).catch((err: Error) => {throw err; });
            }).catch((err: Error) => {
                console.error(err.message);
                res.status(DELETE_GAME_ERROR);
                res.json();
            });
        });

        router.post("/reset",
                    (req: Request, res: Response, next: NextFunction) => {
            const gameToReset: UpdateGameMessage = req.body as UpdateGameMessage;
            const DB: string = gameToReset.gameType === GameType.Simple ? DB_SIMPLE_URL : DB_FREE_URL;

            gameToReset.newHighscores = {
                soloHighscores: GameGeneration.generateFakeHighScores(),
                multiHighscores: GameGeneration.generateFakeHighScores(),
            };

            Axios.post(BASE_URL + DB + UPDATE, gameToReset)
            .then(() => res.json())
            .catch((err: Error) => {
                console.error(err.message);
                res.status(RESET_GAME_ERROR);
                res.json();
            });
        });

        return router;
    }
}
