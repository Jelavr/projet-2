import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { UpdateGameMessage } from "../../../common/communication/messages";
import { DB_ACCESS_ERROR } from "../../../common/constants/errorHTTPCodes";
import { Game } from "../game-generation/game";
import Types from "../types";
import { SimpleGamesDB } from "./simpleGamesDB";

@injectable()
export class SimpleGamesDBController {

    public constructor(@inject (Types.SimpleGamesDB) private simpleGamesDB: SimpleGamesDB) {}

    public get router(): Router {
        const router: Router = Router();

        router.post("/addGame",
                    (req: Request, res: Response, next: NextFunction) => {
            this.simpleGamesDB.addGame(req.body)
            .then((newId: string) => res.json(newId))
            .catch((err: Error) => {
                console.error(err.message);
                res.status(DB_ACCESS_ERROR);
                res.json();
            });
        });

        router.get("/games",
                   (req: Request, res: Response, next: NextFunction) => {
            this.simpleGamesDB.getGames()
            .then((games: Game[]) => {
                res.json(games);
            }).catch((err: Error) => {
                console.error(err.message);
                res.status(DB_ACCESS_ERROR);
                res.json();
            });
        });

        router.put("/gameFromId",
                   (req: Request, res: Response, next: NextFunction) => {
            this.simpleGamesDB.getGameFromId(req.body.id).then((game: Game) => {
                res.json(game);
            })
            .catch((err: Error) => {
                console.error(err.message);
                res.status(DB_ACCESS_ERROR);
                res.json();
            });
        });

        router.post("/drop",
                    (req: Request, res: Response, next: NextFunction) => {
            const msg: UpdateGameMessage = req.body as UpdateGameMessage;
            this.simpleGamesDB.dropGame(msg.gameId)
            .catch((err: Error) => {
                console.error(err.message);
                res.status(DB_ACCESS_ERROR);
            });
            res.json();
        });

        router.post("/updateHighscore",
                    (req: Request, res: Response, next: NextFunction) => {
            const msg: UpdateGameMessage = req.body as UpdateGameMessage;
            if (msg.newHighscores) {
                this.simpleGamesDB.updateHighscore(msg.gameId, msg.newHighscores.soloHighscores, msg.newHighscores.multiHighscores)
                .catch((err: Error) => {
                    console.error(err.message);
                    res.status(DB_ACCESS_ERROR);
                });
            }
            res.json();
        });

        return router;
    }
}
