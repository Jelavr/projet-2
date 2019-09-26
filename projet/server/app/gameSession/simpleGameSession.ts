import * as fs from "fs";
import { ImageBMP } from "../../../common/communication/customImage";
import { DIF_IMG, GAMES, MOD_IMG, NB_DIFF_MULTI, NB_DIFF_SOLO, ORG_IMG } from "../constantes";
import { Game } from "../game-generation/game";
import { ImageUtil } from "../services/image/image-util";
import { GameSession } from "./gameSession";

export class SimpleGameSession extends GameSession {

    protected originalImageModel: ImageBMP;
    protected modifiedImageModel: ImageBMP;
    protected differencesImageModel: ImageBMP;

    public constructor(users: string[], game: Game, isMulti: boolean) {
      super(users, game, isMulti);
      this.differencesImageModel = ImageUtil.readFile("./" + GAMES +  this.game._id + "/" + DIF_IMG);
      this.originalImageModel = ImageUtil.readFile("./" + GAMES +  this.game._id + "/" + ORG_IMG);
      this.modifiedImageModel = ImageUtil.readFile("./" + GAMES +  this.game._id + "/" + MOD_IMG);
      ImageUtil.writeImageToDisk("./" + GAMES +  this.game._id + "/" + this.sessionID + "/", ORG_IMG, this.originalImageModel);
      ImageUtil.writeImageToDisk("./" + GAMES +  this.game._id + "/" + this.sessionID + "/", MOD_IMG, this.modifiedImageModel);
    }

    public quitGame(): void {
        fs.unlinkSync("./" + GAMES + this.game._id + "/" + this.sessionID + "/" + MOD_IMG);
        fs.unlinkSync("./" + GAMES + this.game._id + "/" + this.sessionID + "/" + ORG_IMG);
        fs.rmdirSync("./" + GAMES + this.game._id + "/" + this.sessionID);
    }

    protected updateModifiedImageModel(): void {

        for (let row: number = 0; row < this.modifiedImageModel.pixels.length; ++row) {
            for (let col: number = 0; col < this.modifiedImageModel.pixels[row].length; ++col) {
                if ((this.differencesImageModel.pixels[row][col].isVisited)) {
                    this.modifiedImageModel.pixels[row][col].r = this.originalImageModel.pixels[row][col].r;
                    this.modifiedImageModel.pixels[row][col].g = this.originalImageModel.pixels[row][col].g;
                    this.modifiedImageModel.pixels[row][col].b = this.originalImageModel.pixels[row][col].b;
                }
            }
        }
        ImageUtil.writeImageToDisk("./" + GAMES +  this.game._id + "/" + this.sessionID + "/", MOD_IMG, this.modifiedImageModel);
    }

    public checkDifference(row: number, col: number, user: string): boolean {

        if (!this.differencesImageModel.pixels[row][col].isVisited &&
            ImageUtil.isPixelBlack(this.differencesImageModel.pixels[row][col])) {
            ImageUtil.breadthFirstSearch(this.differencesImageModel.pixels, row, col);
            this.updateModifiedImageModel();
            this.nbDiffFound[user]++;
            if ((this.isMulti && this.nbDiffFound[user] === NB_DIFF_MULTI) ||
                (!this.isMulti && this.nbDiffFound[user] === NB_DIFF_SOLO)) {
                this.finished = true;
            }

            return true;
        } else {
            return false;
        }
    }
}
