import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import { FreeID,
         GameSessionCreationMessage,
         JoinGameSessionMessage,
         MultiCreationMessage,
         MultiSession,
         NewGameSessionMessage,
         QuitGameMessage,
         SimpleCoordinates} from "../../../common/communication/messages";
import { GAME_SESSION_CREATION_ERROR, JOIN_SESSION_ERROR } from "../../../common/constants/errorHTTPCodes";
import { GameSessionManager } from "./gameSessionManager";

@injectable()
export class GameSessionsController {
    public constructor() {return; }

    public get router(): Router {
        const router: Router = Router();

        router.put("/new",
                   (req: Request, res: Response, next: NextFunction) => {
            const gameCreation: NewGameSessionMessage = req.body as NewGameSessionMessage;
            GameSessionManager.newSoloGameSession(gameCreation.user, gameCreation.gameID, gameCreation.gameType)
            .then((msg: GameSessionCreationMessage) => {
                res.json(msg);
            })
            .catch((err: Error) => {
                console.error(err.message);
                res.status(GAME_SESSION_CREATION_ERROR);
                res.json();
            });
        });

        router.put("/newMulti",
                   (req: Request, res: Response, next: NextFunction) => {
            const gameCreation: NewGameSessionMessage = req.body as NewGameSessionMessage;
            GameSessionManager.newMultiGameSession(gameCreation.gameID, gameCreation.gameType)
            .then((msg: MultiCreationMessage) => {
                res.json(msg);
            })
            .catch((err: Error) => {
                console.error(err.message);
                res.status(GAME_SESSION_CREATION_ERROR);
                res.json();
            });
        });

        router.put("/start/:id",
                   (req: Request, res: Response, next: NextFunction) => {
                res.json(GameSessionManager.startGame(req.params.id));
        });

        router.put("/join",
                   (req: Request, res: Response, next: NextFunction) => {
            const joinGame: JoinGameSessionMessage = req.body as JoinGameSessionMessage;
            GameSessionManager.joinGameSession(joinGame.user, joinGame.gameSessionId, joinGame.gameType)
            .then((msg: GameSessionCreationMessage) => {
                res.json(msg);
            })
            .catch((err: Error) => {
                console.error(err.message);
                res.status(JOIN_SESSION_ERROR);
                res.json();
            });
        });

        router.put("/checkSimple",
                   (req: Request, res: Response, next: NextFunction) => {
            const msg: SimpleCoordinates = req.body as SimpleCoordinates;
            res.json(GameSessionManager.checkDifferences(msg.gameSessionID, msg.coord.row, msg.coord.col, msg.user));
        });

        router.put("/checkFree",
                   (req: Request, res: Response, next: NextFunction) => {
            const msg: FreeID = req.body as FreeID;
            res.json(GameSessionManager.checkDifferences3D(msg.gameSessionID, msg.objId, msg.user));
        });

        router.put("/quit",
                   (req: Request, res: Response, next: NextFunction) => {
            const msg: QuitGameMessage = req.body as QuitGameMessage;
            res.json(GameSessionManager.quitGame(msg.gameSessionId, msg.gameType));
        });

        router.get("/requestMulti",
                   (req: Request, res: Response, next: NextFunction) => {
            const msg: MultiSession[] = GameSessionManager.getMultiSessions();
            res.json(msg);
        });

        router.put("/deleted/:gameId",
                   (req: Request, res: Response, next: NextFunction) => {
            GameSessionManager.deletedGame(req.params.gameId);
            res.json();
        });

        return router;
    }
}
