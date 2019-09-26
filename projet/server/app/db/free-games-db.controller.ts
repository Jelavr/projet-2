import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { FreeGameCreationConfirmation, UpdateGameMessage } from "../../../common/communication/messages";
import { DB_ACCESS_ERROR } from "../../../common/constants/errorHTTPCodes";
import { Game } from "../game-generation/game";
import Types from "../types";
import { FreeGamesDB } from "./freeGamesDB";

@injectable()
export class FreeGamesDBController {

    public constructor(@inject (Types.FreeGamesDB) private freGamesDB: FreeGamesDB) {}

    public get router(): Router {
        const router: Router = Router();

        router.post("/addGame",
                    (req: Request, res: Response, next: NextFunction) => {
            this.freGamesDB.addGame(req.body)
            .then((newId: string) => res.json(newId))
            .catch((err: Error) => {
                console.error(err.message);
                res.status(DB_ACCESS_ERROR);
                res.json();
            });
        });

        router.get("/games",
                   (req: Request, res: Response, next: NextFunction) => {
            this.freGamesDB.getGames()
            .then((games: Game[]) => {
                res.json(games);
            })
            .catch((err: Error) => {
                console.error(err.message);
                res.status(DB_ACCESS_ERROR);
                res.json();
            });
        });

        router.put("/gameFromId",
                   (req: Request, res: Response, next: NextFunction) => {
            this.freGamesDB.getGameFromId(req.body.id)
            .then((game: Game) => {
                res.json(game);
            })
            .catch((err: Error) => {
                console.error(err.message);
                res.status(DB_ACCESS_ERROR);
                res.json();
            });
        });

        router.put("/confirmGame",
                   (req: Request, res: Response, next: NextFunction) => {
            const msg: FreeGameCreationConfirmation = req.body as FreeGameCreationConfirmation;

            if (msg.createGame && msg.thumnail) {
                this.freGamesDB.updateGameLogo(msg.gameID, msg.thumnail)
                .then(() => res.json())
                .catch((err: Error) => {
                    console.error(err.message);
                    res.status(DB_ACCESS_ERROR);
                    res.json();
                });
            } else {
                this.freGamesDB.dropGame(msg.gameID)
                .then(() => res.json())
                .catch((err: Error) => {
                    console.error(err.message);
                    res.status(DB_ACCESS_ERROR);
                    res.json();
                });
            }
        });

        router.post("/drop",
                    (req: Request, res: Response, next: NextFunction) => {
            const msg: UpdateGameMessage = req.body as UpdateGameMessage;
            this.freGamesDB.dropGame(msg.gameId)
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
                this.freGamesDB.updateHighscore(msg.gameId, msg.newHighscores.soloHighscores, msg.newHighscores.multiHighscores)
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
