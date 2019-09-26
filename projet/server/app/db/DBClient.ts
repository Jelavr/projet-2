import { Db, MongoClient } from "mongodb";

const DB_USER: string = "admin";
const DB_PASSWORD: string = "admin";
const DB_DB: string = "projet2";
const DB_HOST: string = "-vrpcn.mongodb.net";
const DB_OPTIONS: string = "test?retryWrites=true";

const URL_DB: string = "mongodb+srv://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_DB + DB_HOST + "/" + DB_OPTIONS;

export class DBClient {
    public db: Db;

    public constructor() {
        this.connect();
    }

    public connect(): void {
         MongoClient.connect(URL_DB, { useNewUrlParser: true })
            .then((client: MongoClient) => {
                this.db = client.db(DB_DB);
            }).catch((error: Error) => {
               console.error(error);
            });
    }
}
