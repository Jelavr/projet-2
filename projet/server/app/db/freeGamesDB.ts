import { injectable } from "inversify";
import {
    Collection,
    InsertOneWriteOpResult,
    ObjectId,
    UpdateWriteOpResult,
} from "mongodb";
import { HighScore } from "../../../common/communication/card";
import { FREE_GAMES_COLLECTION } from "../constantes";
import { Game } from "../game-generation/game";
import { AddGameDbError } from "../services/customServiceErrors/addGameDbError";
import { DropGameError } from "../services/customServiceErrors/dropGameError";
import { ResetHighScoreError } from "../services/customServiceErrors/resetHighScoreError";
import { UpdateGameLogoError } from "../services/customServiceErrors/updateGameLogoErrors";
import { DBClient } from "./DBClient";

@injectable()
export class FreeGamesDB {
    private client: DBClient;
    private collection: Collection;

    public constructor() {
       this.client = new DBClient();
    }

    private connect(): void {
        if (this.client.db != null) {
            this.collection = this.client.db.collection(FREE_GAMES_COLLECTION);
        }
    }

    public async addGame(game: Game): Promise<string> {
        this.connect();
        delete game._id;

        return this.collection.insertOne(game).then((value: InsertOneWriteOpResult) => {
            return value.insertedId.toHexString();
        }).catch(() => {
            throw new AddGameDbError;
        });
    }

    public async getGameFromId(id: string): Promise<Game> {
        this.connect();

        return this.collection.findOne({_id: new ObjectId(id)})
            .then((game: Game) => {
                return game;
            })
            .catch(() => {

                return {
                    _id: "",
                    name: "",
                    thumbnail: "",
                    soloHighScores: Array<HighScore>(),
                    multiHighScores: Array<HighScore>(),
                };
            });
    }

    public async getGames(): Promise<Game[]> {
        this.connect();

        return this.collection.find({}).toArray().catch(() => {
            return new Array<Game>();
        });
    }

    public async updateGameLogo(id: string, logo: string): Promise<UpdateWriteOpResult> {
        this.connect();

        return this.collection.updateOne({_id: new ObjectId(id)},
                                         {$set: {thumbnail: logo}}).catch(() => {
                                      throw new UpdateGameLogoError;
                                  });
    }

    public async dropGame(id: string): Promise<void> {
        this.connect();
        this.collection.findOneAndDelete({_id: new ObjectId(id)}).catch(() => {
            throw new DropGameError;
        });
    }

    public async updateHighscore(id: string, soloHighscore: HighScore[], multiHighscore: HighScore[]): Promise<void> {
        this.connect();
        this.collection.updateOne({_id: new ObjectId(id)},
                                  {$set: {soloHighScores: soloHighscore,
                                          multiHighScores: multiHighscore}}).catch(() => {throw new ResetHighScoreError; });
    }
}
