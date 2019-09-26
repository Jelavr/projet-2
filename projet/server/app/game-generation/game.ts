import { HighScore } from "../../../common/communication/card";
import { FreeViewResponse } from "../../../common/communication/scene";

export interface Game {
    _id: string;
    name: string;
    thumbnail: string;
    soloHighScores: HighScore[];
    multiHighScores: HighScore[];
}

export interface SimpleGame extends Game {
    originalImage: string;
    modifiedImage: string;
    differences: string;
}

export interface FreeGame extends Game {
    objets: FreeViewResponse;
}
