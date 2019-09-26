import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GameMessage } from "../../../common/communication/gameMessage";
import { MultiMessage, MultiSession } from "../../../common/communication/messages";
import { SocketService } from "../services/socket/socket.service";
import Types from "../types";

@injectable()
export class SocketController {
    public constructor(@inject (Types.SocketService) private socketService: SocketService) {}

    public get router(): Router {
        const router: Router = Router();

        router.post("/message/global",
                    (req: Request, res: Response, next: NextFunction) => {
            const msgToSend: GameMessage = req.body as GameMessage;
            this.socketService.emitGlobalMessage(msgToSend);
            res.json();
        });

        router.post("/message/:room",
                    (req: Request, res: Response, next: NextFunction) => {
            const msgToSend: GameMessage = req.body as GameMessage;
            this.socketService.emitMessageToRoom(msgToSend, req.params.room);
            res.json();
        });

        router.post("/multi/sessions",
                    (req: Request, res: Response, next: NextFunction) => {
            const multiSessionsToSend: MultiSession[] = req.body as MultiSession[];
            this.socketService.sendMultiSessions(multiSessionsToSend);
            res.json();
        });

        router.post("/multi/:room",
                    (req: Request, res: Response, next: NextFunction) => {
            const msg: MultiMessage = req.body as MultiMessage;
            this.socketService.sendMultiMsgToRoom(req.params.room, msg);
            res.json();
        });

        router.post("/multi/join/:id",
                    (req: Request, res: Response, next: NextFunction) => {
            this.socketService.sendToLobby(req.params.id);
            res.json();
        });

        return router;
    }
}
