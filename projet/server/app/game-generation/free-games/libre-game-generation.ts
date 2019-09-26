import { FreeViewResponse } from "../../../../common/communication/scene";
import { FreeGame } from "../game";
import { GameGeneration } from "../game-generation";

export class FreeGameGeneration extends GameGeneration {

    public static async addFreeGameToDataBase(name: string, objets: FreeViewResponse): Promise<string> {
        const gameToAdd: FreeGame = super.prototype.generateGame(name, false) as FreeGame;
        gameToAdd.objets = objets;

        return super.prototype.sendToDataBase(gameToAdd, false);
    }

}
