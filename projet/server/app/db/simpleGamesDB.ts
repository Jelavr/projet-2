import { injectable } from "inversify";
import {
    Collection,
    InsertOneWriteOpResult,
    ObjectId,
} from "mongodb";
import { HighScore } from "../../../common/communication/card";
import { BASE_URL, DIF_IMG, MOD_IMG, ORG_IMG, SIMPLE_GAMES_COLLECTION } from "../constantes";
import { Game } from "../game-generation/game";
import { AddGameDbError } from "../services/customServiceErrors/addGameDbError";
import { DropGameError } from "../services/customServiceErrors/dropGameError";
import { ResetHighScoreError } from "../services/customServiceErrors/resetHighScoreError";
import { SetGameImageError} from "../services/customServiceErrors/setGameImageError";
import { DBClient } from "./DBClient";

@injectable()
export class SimpleGamesDB {
    private client: DBClient;
    private collection: Collection;

    public constructor() {
       this.client = new DBClient();
    }

    private connect(): void {
        if (this.client.db != null) {
            this.collection = this.client.db.collection(SIMPLE_GAMES_COLLECTION);
        }
    }

    public async addGame(game: Game): Promise<string> {
        this.connect();
        delete game._id;

        return this.collection.insertOne(game).then((value: InsertOneWriteOpResult) => {
            this.setGameImages(value.insertedId).catch((err: Error) => {throw err; });

            return value.insertedId.toHexString();
        }).catch(() => {
            throw new AddGameDbError;
        });
    }

    private async setGameImages(id: ObjectId): Promise<void> {
        this.connect();
        this.collection.updateOne({_id: id},
                                  {$set: {originalImage: BASE_URL + "games/" + id.toHexString() + "/" + ORG_IMG,
                                          modifiedImage: BASE_URL + "games/" + id.toHexString() + "/" + MOD_IMG,
                                          differences: BASE_URL + "games/" + id.toHexString() + "/" + DIF_IMG,
                                          thumbnail: BASE_URL + "games/" + id.toHexString() + "/" + ORG_IMG}})
                                          .catch(() => {
                                              throw new SetGameImageError;
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
