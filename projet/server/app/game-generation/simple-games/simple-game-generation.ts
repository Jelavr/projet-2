import { ImageBMP } from "../../../../common/communication/customImage";
import { DIF_IMG, GAMES, MOD_IMG, ORG_IMG } from "../../constantes";
import { AddGameDbError } from "../../services/customServiceErrors/addGameDbError";
import { ImageUtil } from "../../services/image/image-util";
import { SimpleGame } from "../game";
import { GameGeneration } from "../game-generation";

export class SimpleGameGeneration extends GameGeneration {

    private constructor() { super(); }
    public static async addSimpleGameToDataBase(name: string, originalImage: ImageBMP, modifiedImage: ImageBMP, diffImage: ImageBMP)
    : Promise<void> {

        const gameToAdd: SimpleGame = super.prototype.generateGame(name, true) as SimpleGame;

        super.prototype.sendToDataBase(gameToAdd, true).then((_id: string) => {
            SimpleGameGeneration.writeImages(originalImage, modifiedImage, diffImage, _id);
        }).catch(() => {
            throw new AddGameDbError;
        });
    }

    private static writeImages(originalImage: ImageBMP, modifiedImage: ImageBMP, diffImage: ImageBMP, id: string): void {
        ImageUtil.writeImageToDisk("./" + GAMES + id + "/", ORG_IMG, originalImage);
        ImageUtil.writeImageToDisk("./" + GAMES + id + "/", MOD_IMG, modifiedImage);
        ImageUtil.writeImageToDisk(GAMES + id + "/", DIF_IMG, diffImage);
    }
}
