import {expect} from "chai";
import * as sinon from "sinon";
import * as supertest from "supertest";
import * as errors from "../../../../common/communication/errorMessage";
import imagesName from "../../../../common/communication/imagesName";
import { GameCreationMessage } from "../../../../common/communication/messages";
import {Application} from "../../app";
import {container} from "../../inversify.config";
import TYPES from "../../types";
import { GenImageController } from "./gen-image.controller";
import { GenImageService } from "./gen-image.service";
import { SimpleGameGeneration } from "./simple-game-generation";

describe("Image Service Tests :", () => {
    const okStatus: number = 200;
    const url: string = "/api/upload";
    const content: string = "Content-Type";
    const imageController: GenImageController = new GenImageController(new GenImageService());
    let app: Express.Application;
    let stub: sinon.SinonStub;

    const mockDBCall: Function = (): void => {  return; };
    beforeEach(() => {
        app = container.get<Application>(TYPES.Application).app;
        stub = sinon.stub(SimpleGameGeneration, "addSimpleGameToDataBase");
        stub.call(mockDBCall);
    });

    afterEach( () => {
        stub.restore();
    });

    it("should return false when receive an invalid input.", () => {
        const files: {[fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] = [];
        expect(imageController.isValid(files)).to.equal(false);
    });

    it("should return false if there is only one file.", async () => {
        return supertest(app)
        .post(url)
        .field(imagesName.name, "sauce2.bmp")
        .attach(imagesName.originalName,  "./app/tests/images/test.jpeg")
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response ) => {
            expect((response.body) as GameCreationMessage).to.deep.equal(errors.invalidFiles);
        });
    });

    it("should return false when the file type is not .bmp", async () => {
        return supertest(app)
        .post(url)
        .field(imagesName.name, "sauce2.bmp")
        .field(imagesName.name, "sauce2.bmp")
        .attach(imagesName.originalName, "./app/tests/images/test.jpeg")
        .attach(imagesName.modifiedName, "./app/tests/images/test.jpeg")
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response) => {
            expect((response.body) as GameCreationMessage).to.deep.equal(errors.invalidFiles);
        });
    });

    it("should return true when the files are valid with the right size and type.", async () => {
        return supertest(app)
        .post(url)
        .field(imagesName.name, "sauce.bmp")
        .attach(imagesName.originalName, "./app/tests/images/original7.bmp")
        .attach(imagesName.modifiedName, "./app/tests/images/modified7.bmp")
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response) => {
            expect((response.body) as GameCreationMessage).to.deep.equal({ gameCreated: true });
        });
  });

    it("should return false if there are more or less than 7 differences", async () => {
    return supertest(app)
    .post(url)
    .field(imagesName.name, "sauce.bmp")
    .attach(imagesName.originalName, "./app/tests/images/original.bmp")
    .attach(imagesName.modifiedName, "./app/tests/images/modified.bmp")
    .expect(content, /json/)
    .expect(okStatus)
    .then((response: supertest.Response) => {
        expect((response.body) as GameCreationMessage).to.deep.equal(errors.not7diff);
    });
});
    it("should return false if there images are not 640x480", async () => {
        return supertest(app)
        .post(url)
        .field(imagesName.name, "sauce.bmp")
        .attach(imagesName.originalName, "./app/tests/images/originalWrongSize.bmp")
        .attach(imagesName.modifiedName, "./app/tests/images/modifiedWrongSize.bmp")
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response) => {
            expect((response.body) as GameCreationMessage).to.deep.equal(errors.invalidFiles);
        });
    });

});
