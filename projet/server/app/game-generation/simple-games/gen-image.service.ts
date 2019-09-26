import * as fs from "fs";
import { injectable } from "inversify";
import "reflect-metadata";
import { ImageBMP } from "../../../../common/communication/customImage";
import * as errors from "../../../../common/communication/errorMessage";
import { GameCreationMessage } from "../../../../common/communication/messages";
import { ImageUtil } from "../../services/image/image-util";
import { SimpleGameGeneration } from "./simple-game-generation";

@injectable()
export class GenImageService {
    private originalImage: ImageBMP;
    private modifiedImage: ImageBMP;

    private updateModifiedImage(img: ImageBMP): void {
        this.modifiedImage = img;
    }

    private updateOriginalImage(img: ImageBMP): void {
        this.originalImage = img;
    }

    private removeImagesFromDisk(originalFile: string, modifiedFile: string): void {
        fs.unlinkSync(originalFile);
        fs.unlinkSync(modifiedFile);
    }

    public async generateDiffImage(originalFile: string, modifiedFile: string, name: string): Promise<GameCreationMessage> {
        this.updateOriginalImage(ImageUtil.readFile(originalFile));
        this.updateModifiedImage(ImageUtil.readFile(modifiedFile));

        this.removeImagesFromDisk(originalFile, modifiedFile);

        const isCorrectFormat: boolean = ImageUtil.checkFormat(this.originalImage) &&
                                         ImageUtil.checkFormat(this.modifiedImage);
        if (!isCorrectFormat) {
            return errors.invalidFiles;
        }

        const diffImage: ImageBMP = ImageUtil.computeDiffImage(this.originalImage, this.modifiedImage, name);

        const hasSevenDiff: boolean = ImageUtil.imageHasSevenDiff(diffImage.pixels);
        if (!hasSevenDiff) {
            return errors.not7diff;
        } else {
            try {
                await SimpleGameGeneration.addSimpleGameToDataBase(name, this.originalImage, this.modifiedImage, diffImage);
            } catch (err) {
                throw err;
            }

            return {
                gameCreated: hasSevenDiff,
            };
        }
    }
}
