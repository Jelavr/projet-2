import { Container } from "inversify";
import "reflect-metadata";
import { Application } from "./app";
import { GameAdminController } from "./controllers/game-admin.controller";
import { MicroserviceController } from "./controllers/microservice.controller";
import { SocketController } from "./controllers/socket.controller";
import { UsersController } from "./controllers/users.controller";
import { FreeGamesDBController } from "./db/free-games-db.controller";
import { FreeGamesDB } from "./db/freeGamesDB";
import { SimpleGamesDBController } from "./db/simple-games-db.controller";
import { SimpleGamesDB } from "./db/simpleGamesDB";
import { GenSceneController } from "./game-generation/free-games/gen-scene.controller";
import { GenSceneService } from "./game-generation/free-games/gen-scene.service";
import { GenImageController } from "./game-generation/simple-games/gen-image.controller";
import { GenImageService } from "./game-generation/simple-games/gen-image.service";
import { GameSessionsController } from "./gameSession/game-session.controller";
import { Server } from "./server";
import { SocketService } from "./services/socket/socket.service";
import { UsersService } from "./services/users/users.service";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.GenImageService).to(GenImageService);
container.bind(Types.GenImageController).to(GenImageController);

container.bind(Types.SocketService).toConstantValue(new SocketService());
container.bind(Types.SocketController).to(SocketController);

container.bind(Types.UsersService).toConstantValue(new UsersService());
container.bind(Types.UsersController).to(UsersController);

container.bind(Types.GenSceneService).to(GenSceneService);
container.bind(Types.GenSceneController).to(GenSceneController);

container.bind(Types.SimpleGamesDB).to(SimpleGamesDB);
container.bind(Types.SimpleGamesDBController).to(SimpleGamesDBController);

container.bind(Types.FreeGamesDB).to(FreeGamesDB);
container.bind(Types.FreeGamesDBController).to(FreeGamesDBController);

container.bind(Types.GameSessionsController).to(GameSessionsController);

container.bind(Types.GameAdminController).to(GameAdminController);

container.bind(Types.MicroserviceController).to(MicroserviceController);

export { container };
