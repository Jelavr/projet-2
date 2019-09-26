import * as chai from "chai";
import spies = require("chai-spies");
import * as sinon from "sinon";
import { ImageBMP } from "../../../../common/communication/customImage";
import { ImageUtil } from "../../services/image/image-util";
import { SimpleGameGeneration } from "./simple-game-generation";
chai.use(spies);

describe("Simple game generation tests", () => {
    const imageBMP: ImageBMP = {
        pixels: [],
        header: new Uint8Array(1),
    };
    let stub: sinon.SinonStub;

    const mockFsCall: Function = (): void => {  return; };
    beforeEach(() => {
        stub = sinon.stub(ImageUtil, "writeImageToDisk");
        stub.call(mockFsCall);
    });

    afterEach( () => {
        stub.restore();
    });

    it("method writeImage should call ImageUtil.writeImage fuction", () => {
        chai.spy.on(ImageUtil, "writeImageToDisk");
        SimpleGameGeneration["writeImages"](imageBMP, imageBMP, imageBMP, "id");
        chai.expect(ImageUtil.writeImageToDisk).to.have.been.called();
    });

});
