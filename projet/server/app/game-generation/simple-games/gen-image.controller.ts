import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import * as errors from "../../../../common/communication/errorMessage";
import imagesName from "../../../../common/communication/imagesName";
import { GameCreationMessage } from "../../../../common/communication/messages";
import { GAME_CREATION_ERROR } from "../../../../common/constants/errorHTTPCodes";
import Types from "../../types";
import { GenImageService } from "./gen-image.service";

@injectable()
export class GenImageController {

  public constructor(@inject(Types.GenImageService) public genImageService: GenImageService) { }

  public get router(): Router {
    const router: Router = Router();
    router.post("/", this.upload.fields(
      [{ name: imagesName.originalName, maxCount: 1 }, { name: imagesName.modifiedName, maxCount: 1 }]),
                (req: Request, res: Response, next: NextFunction) => {
        if (this.isValid(req.files) && this.isValidFileType(req.files)) {
          const image1: Express.Multer.File = req.files[imagesName.originalName][0];
          const image2: Express.Multer.File = req.files[imagesName.modifiedName][0];
          this.genImageService.generateDiffImage(
            "./" + image1.destination + "/" + image1.filename,
            "./" + image2.destination + "/" + image2.filename, req.body[imagesName.name])
            .then((status: GameCreationMessage) => {
              res.send(status);
            })
            .catch((err: Error) => {
              console.error(err.message);
              res.status(GAME_CREATION_ERROR);
              res.json();
            });

        } else {
          res.send(errors.invalidFiles);
        }
      });

    return router;
  }

  private storage: multer.StorageEngine = multer.diskStorage({
    destination: imagesName.dest,
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  private upload: multer.Instance = multer({
    storage: this.storage,
    fileFilter: (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
        if (file.mimetype !== "image/bmp") {
          return cb(null, false);
        } else {
          cb(null, true);
        }},
    });

  public isValidFileType(files: {[fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[]): boolean {
    return (files[imagesName.originalName][0]["mimetype"] === imagesName.type &&
            files[imagesName.modifiedName][0]["mimetype"] === imagesName.type);
 }

  public isValid(files: {[fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[]): boolean {
    return (files && this.checkFileArraySize(files));
  }

  private checkFileArraySize(files: {[fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[]): boolean {
    if (files[imagesName.originalName] && files[imagesName.modifiedName]) {
    return (files[imagesName.originalName].length === 1 && files[imagesName.modifiedName].length === 1);
  }

    return false;
  }
}
