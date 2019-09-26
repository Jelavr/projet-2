import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { FreeGameCreationConfirmation, FreeGameCreationMessage } from "../../../../common/communication/messages";
import { GAME_CONFIRMATION_ERROR, GAME_CREATION_ERROR } from "../../../../common/constants/errorHTTPCodes";
import { BASE_URL, CONFIRM, DB_FREE_URL } from "../../constantes";
import Types from "../../types";
import { GenSceneService } from "./gen-scene.service";

@injectable()
export class GenSceneController {

  public constructor(@inject(Types.GenSceneService) private genSceneService: GenSceneService) { }

  public get router(): Router {
      const router: Router = Router();

      router.post("/add", (req: Request, res: Response, next: NextFunction) => {
        this.genSceneService.generateSceneObjects(req.body)
        .then((msg: FreeGameCreationMessage) => {
          res.send(msg);
        })
        .catch((err: Error) => {
          console.error(err.message);
          res.status(GAME_CREATION_ERROR);
          res.json();
        });
      });

      router.put("/confirm", (req: Request, res: Response, next: NextFunction) => {
        const msg: FreeGameCreationConfirmation = req.body as FreeGameCreationConfirmation;
        Axios.put(BASE_URL + DB_FREE_URL + CONFIRM, msg)
        .then(() => res.json())
        .catch((err: Error) => {
          console.error(err.message);
          res.status(GAME_CONFIRMATION_ERROR);
          res.json();
        });
      });

      return router;
  }
}
