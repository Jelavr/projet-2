import Axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import { CheckDifferencesMessage,
         GameSessionCreationMessage,
         JoinGameSessionMessage,
         MultiSession, } from "../../../common/communication/messages";
import { BASE_URL, CHECK_FREE, CHECK_SIMPLE, JOIN, NEW, NEW_MULTI, QUIT, REQUEST_MULTI, SESSION, START } from "../constantes";

@injectable()
export class MicroserviceController {
    public constructor() {return; }

    public get router(): Router {
        const router: Router = Router();

        router.put("/session/new",
                   (req: Request, res: Response, next: NextFunction) => {

            Axios.put<GameSessionCreationMessage>( BASE_URL + SESSION + NEW, req.body)
            .then((response: AxiosResponse<GameSessionCreationMessage>) => {
                res.json(response.data);
            }).catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        router.put("/session/newMulti",
                   (req: Request, res: Response, next: NextFunction) => {

            Axios.put<GameSessionCreationMessage>( BASE_URL + SESSION + NEW_MULTI, req.body)
            .then((response: AxiosResponse<GameSessionCreationMessage>) => {
                res.json(response.data);
            }).catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        router.put("/session/join",
                   (req: Request, res: Response, next: NextFunction) => {

            Axios.put<JoinGameSessionMessage>( BASE_URL + SESSION + JOIN, req.body)
            .then((response: AxiosResponse<JoinGameSessionMessage>) => {
                res.json(response.data);
            }).catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        router.put("/session/checkSimple",
                   (req: Request, res: Response, next: NextFunction) => {

            Axios.put<CheckDifferencesMessage>( BASE_URL + SESSION + CHECK_SIMPLE, req.body)
            .then((response: AxiosResponse<CheckDifferencesMessage>) => {
                res.json(response.data);
            }).catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        router.put("/session/checkFree",
                   (req: Request, res: Response, next: NextFunction) => {
            Axios.put<CheckDifferencesMessage>( BASE_URL + SESSION + CHECK_FREE, req.body)
            .then((response: AxiosResponse<CheckDifferencesMessage>) => {
                res.json(response.data);
            }).catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        router.put("/session/start/:id",
                   (req: Request, res: Response, next: NextFunction) => {
            Axios.put<boolean>( BASE_URL + SESSION + START + req.params.id, req.body)
            .then((response: AxiosResponse<boolean>) => {
                res.json(response.data);
            }).catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        router.put("/session/quit",
                   (req: Request, res: Response, next: NextFunction) => {
            Axios.put( BASE_URL + SESSION + QUIT, req.body)
            .then(() => res.json())
            .catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        router.get("/session/requestMulti",
                   (req: Request, res: Response, next: NextFunction) => {
            Axios.get(BASE_URL + SESSION + REQUEST_MULTI)
            .then((response: AxiosResponse<MultiSession[]>) => {
                res.json(response.data);
            })
            .catch((error: Error) => {
                console.error("There was a problem in the communication between the server and the Game Session service.");
                console.error(error.message);
            });
        });

        return router;

    }
}
