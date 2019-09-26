import {expect} from "chai";
import * as fs from "fs";
import { APP, IMAGES, TESTS } from "../../constantes";
import { ImageUtil } from "./image-util";

describe("Tests ImageUtil", () => {

    it("writeImageToDisk produces a valid output file.", () => {
        ImageUtil.writeImageToDisk("./" + APP, "/myImage.bmp",
                                   ImageUtil.generateImageFromBuffer(fs.readFileSync("./" + APP + TESTS + IMAGES + "original7.bmp")));
        const exists: boolean = fs.existsSync("./" + APP + "myImage.bmp");
        fs.unlinkSync("./" + APP + "myImage.bmp");
        expect(exists).to.equal(true);
    });

    it("writeImageToDisk should create the path for the image if it does not exist", () => {
        ImageUtil.writeImageToDisk("./" + APP + "testImageUtil", "/myImage.bmp",
                                   ImageUtil.generateImageFromBuffer(fs.readFileSync("./" + APP + TESTS + IMAGES + "original7.bmp")));
        const exists: boolean = fs.existsSync("./" + APP + "testImageUtil");
        fs.unlinkSync("./" + APP + "testImageUtil/myImage.bmp");
        fs.rmdirSync("./" + APP + "testImageUtil");
        expect(exists).to.equal(true);
    });
});
