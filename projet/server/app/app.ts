import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { GameAdminController } from "./controllers/game-admin.controller";
import { MicroserviceController } from "./controllers/microservice.controller";
import { SocketController } from "./controllers/socket.controller";
import { UsersController } from "./controllers/users.controller";
import { FreeGamesDBController } from "./db/free-games-db.controller";
import { SimpleGamesDBController } from "./db/simple-games-db.controller";
import { GenSceneController } from "./game-generation/free-games/gen-scene.controller";
import { GenImageController } from "./game-generation/simple-games/gen-image.controller";
import { GameSessionsController } from "./gameSession/game-session.controller";
import Types from "./types";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(@inject(Types.GenImageController) private genImageController: GenImageController,
                       @inject(Types.UsersController) private usersController: UsersController,
                       @inject(Types.GenSceneController) private genSceneController: GenSceneController,
                       @inject(Types.SimpleGamesDBController) private simpleGamesDBController: SimpleGamesDBController,
                       @inject(Types.FreeGamesDBController) private freeGamesDBController: FreeGamesDBController,
                       @inject(Types.GameSessionsController) private gameSessionsController: GameSessionsController,
                       @inject(Types.GameAdminController) private gameAdminController: GameAdminController,
                       @inject(Types.SocketController) private socketController: SocketController,
                       @inject(Types.MicroserviceController) private microserviceController: MicroserviceController) {
        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: "50mb", parameterLimit: 10000 }));
        this.app.use(cookieParser());
        this.app.use(express.static("./uploads"));
        this.app.use("/games", express.static("./games"));
        this.app.use(cors());
    }

    public bindRoutes(): void {
        this.app.use("/api/upload", this.genImageController.router);
        this.app.use("/users", this.usersController.router);
        this.app.use("/db/simple", this.simpleGamesDBController.router);
        this.app.use("/db/free", this.freeGamesDBController.router);
        this.app.use("/session", this.gameSessionsController.router);
        this.app.use("/api/createScene", this.genSceneController.router);
        this.app.use("/admin", this.gameAdminController.router);
        this.app.use("/socket", this.socketController.router);
        this.app.use("/api/micro", this.microserviceController.router);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
