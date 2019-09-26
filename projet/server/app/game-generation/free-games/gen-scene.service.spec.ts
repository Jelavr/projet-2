import Axios, { AxiosResponse} from "axios";
import * as chai from "chai";
import spies = require("chai-spies");
chai.use(spies);
import * as THREE from "three";
import { FreeGameCreationMessage } from "../../../../common/communication/messages";
import { FreeViewRequest, FreeViewResponse, JSON3DWrapper, Object3DWrapper,
   TYPE_MODIFICATION } from "../../../../common/communication/scene";
import { container } from "../../inversify.config";
import { FreeGameCreationError } from "../../services/customServiceErrors/freeGameCreationError";
import TYPES from "../../types";
import {GenSceneService} from "./gen-scene.service";
import { ObjectGenerator } from "./objectGenerator";

describe("Gen Scene Tests: ", () => {
  let service: GenSceneService;
  const nTestCases: number = 5;
  const okStatus: number = 200;
  const sandbox: ChaiSpies.Sandbox = chai.spy.sandbox();
  service = container.get<GenSceneService>(TYPES.GenSceneService);

  beforeEach( () => {
    sandbox.on(Axios, "post", async (): Promise<AxiosResponse<string>> => {
      return new Promise<AxiosResponse<string>>((resolve: (value: AxiosResponse<string>) => void,
                                                 reject: (reason: string) => void) => {
          resolve({data: "unBelId",
                   status: okStatus,
                   statusText: "200 OK",
                   headers: "",
                   config: {}});
       });
  });
  });

  afterEach( () => {
    sandbox.restore();
  });

  describe(" Method requestIsValid()", () => {

    it("Should return false when the request has no name.", () => {
            const request: FreeViewRequest = {name: "", quantity: 10,
                                              modifications: [TYPE_MODIFICATION.Color, TYPE_MODIFICATION.Add], theme: false};
            chai.expect(service["requestIsValid"](request)).to.deep.equal(false);
    });

    it("Should return false when the request has an invalid quantity.", () => {
        const request: FreeViewRequest = {name: "monJeu", theme: false, quantity: 201,
                                          modifications: [TYPE_MODIFICATION.Color, TYPE_MODIFICATION.Add]};
        chai.expect(service["requestIsValid"](request)).to.deep.equal(false);
    });

    it("Should return false when the request has an invalid array of modifications.", () => {
        const request: FreeViewRequest = {name: "monJeu", theme: false, quantity: 150, modifications: []};
        chai.expect(service["requestIsValid"](request)).to.deep.equal(false);
    });

    it("Should return true when the request is valid.", () => {
        const modif: TYPE_MODIFICATION[] = [TYPE_MODIFICATION.Color, TYPE_MODIFICATION.Add, TYPE_MODIFICATION.Delete];
        const request: FreeViewRequest = {name: "monJeu", theme: false, quantity: 16, modifications: modif};
        chai.expect(service["requestIsValid"](request)).to.deep.equal(true);
    });
  });

  describe(" Method initializeTriangles()", () => {
      const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
      let isRandom: boolean = false;

      it("should generate random colors for the mesh", () => {
      const color1: number = geometry.faces[0].color.getHex();
      for (let i: number = 0; i < nTestCases; i++) {
        service.initializeTriangles(geometry, service.getRandomHex(color1));
        if (geometry.faces[0].color.getHex() !== color1) {
          isRandom = true;
        }
      }
      chai.expect(isRandom).to.deep.equal(true);
    });

      it("should create a new color if the current color is the same as the random color", () => {
      const color: number = 0xFFFFFF;
      geometry.faces[0].color.setHex(color);
      service.initializeTriangles(geometry, color);
      chai.expect(geometry.faces[0].color).to.not.deep.equal(color);
    });
  });

  describe(" Method initializeResponse()", () => {
    const response: FreeViewResponse = {
    objectsOriginal: new Array<JSON3DWrapper>(),
    objectsModified: new Array<JSON3DWrapper>(),
    };

    it("should be able to return a valid response.", () => {
      chai.expect(service["initializeResponse"]()).to.deep.equal(response);
    });
  });

  describe(" Method generateDifferences()", () => {
    const req: FreeViewRequest = {
      name: "",
      quantity: 0,
      modifications: [],
      theme: false,
    };
    const nDiffs: number = 7;
    const nObjects: number = 20;
    beforeEach(() => {
      service["objectsModified"] = new Array<Object3DWrapper>();
      service["objectsOriginal"] = new Array<Object3DWrapper>();
      req.modifications = [];
      for (let i: number = 0; i < nObjects; i++) {
            service["generateRandomObject3D"]();
          }
    });

    it("should add 7 objets when only the add objet option is checked", () => {
      req.modifications.push(TYPE_MODIFICATION.Add);
      service.generateDifferences(req);
      chai.expect(service["objectsModified"].length).to.deep.equal(nObjects + nDiffs);
      });

    it("should remove 7 items when only remove objet option is checked", () => {
      req.modifications.push(TYPE_MODIFICATION.Delete);
      service.generateDifferences(req);
      let nDeleted: number = 0;
      service["objectsModified"].forEach( (wrapper: Object3DWrapper) => {
        if (wrapper.obj().userData["modificationType"] === TYPE_MODIFICATION.Delete) {
          nDeleted++;
        }
      });
      chai.expect(nDeleted).to.deep.equal(nDiffs);
    });

    it("should do nothing when the modifications types contains corrupted actions", () => {
      const corruption: number = 5;
      req.modifications.push(corruption);
      service.generateDifferences(req);
      let isCorrupted: boolean = false;
      service["objectsModified"].forEach( (obj: Object3DWrapper) => {
        if (obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.NoModif) {
          isCorrupted = true;
        }
      });
      chai.expect(isCorrupted).to.deep.equal(false);
    });

    it("should change the color of 7 different objet when option color is checked", () => {
      req.modifications.push(TYPE_MODIFICATION.Color);
      const colors: number[] = new Array<number>();
      for (let i: number = 0; i < nObjects; i++) {
        colors.push(service["objectsModified"][i].getColor());
      }
      service.generateDifferences(req);
      let nChanged: number = 0;
      for (let i: number = 0; i < nObjects; i++) {
        if (colors[i] !== (service["objectsModified"][i].getColor())) {
          nChanged++;
        }
      }
      chai.expect(nChanged).to.deep.equal(nDiffs);
    });

    it("should generate exactly 7 differences when ALL options are checked", () => {
      req.modifications.push(TYPE_MODIFICATION.Color);
      req.modifications.push(TYPE_MODIFICATION.Add);
      req.modifications.push(TYPE_MODIFICATION.Delete);
      service.generateDifferences(req);
      let nDiff: number = 0;
      service["objectsModified"].concat(service["objectsOriginal"]).forEach(
        (obj: Object3DWrapper) => {
          if (obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.NoModif) {
            ++nDiff;
          }
      });

      chai.expect(nDiff).to.deep.equal(nDiffs + nDiffs);
    });

    it("should generate exactly 7 differences of add and delete but not colors when only these options are checked", () => {
      req.modifications.push(TYPE_MODIFICATION.Add);
      req.modifications.push(TYPE_MODIFICATION.Delete);
      let nDiff: number = 0;
      service.generateDifferences(req);
      service["objectsModified"].concat(service["objectsOriginal"]).forEach(
        (obj: Object3DWrapper) => {
          if (obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.NoModif &&
              obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.Color) {
            ++nDiff;
          }
      });
      chai.expect(nDiff).to.deep.equal(nDiffs + nDiffs);
    });

    it("should generate exactly 7 differences of add and color but not delete when only these options are checked", () => {
      req.modifications.push(TYPE_MODIFICATION.Add);
      req.modifications.push(TYPE_MODIFICATION.Color);
      let nDiff: number = 0;
      service.generateDifferences(req);
      service["objectsModified"].concat(service["objectsOriginal"]).forEach(
        (obj: Object3DWrapper) => {
          if (obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.NoModif &&
              obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.Delete) {
            ++nDiff;
          }
      });
      chai.expect(nDiff).to.deep.equal(nDiffs + nDiffs);
    });

    it("should generate exactly 7 differences of delete and color but not delete when only these options are checked", () => {
      req.modifications.push(TYPE_MODIFICATION.Delete);
      req.modifications.push(TYPE_MODIFICATION.Color);
      let nDiff: number = 0;
      service.generateDifferences(req);
      service["objectsModified"].concat(service["objectsOriginal"]).forEach(
        (obj: Object3DWrapper) => {
          if (obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.NoModif &&
              obj.obj().userData["modificationType"] !== TYPE_MODIFICATION.Add) {
            ++nDiff;
          }
      });
      chai.expect(nDiff).to.deep.equal(nDiffs + nDiffs);
    });

  });

  describe(" Method areInCollisions()", () => {

    it("should return true if 2 objects are in collisions", () => {
      let originalObject: Object3DWrapper;
      const init: Function = (lol: Object3DWrapper): void => {
        originalObject = lol;
      };
      const init2: Function = (cube: Object3DWrapper): void => {
        cube.setId("different name to allow collision");
        chai.expect(service["areInCollisions"](originalObject.obj(),
                                               [cube])).to.deep.equal(true);
      };
      const scale: number = Math.random() + 1 / (1 + 1);
      ObjectGenerator.Cube(init, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), service["DEFAULT_MATERIAL"], scale);
      ObjectGenerator.Cube(init2, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), service["DEFAULT_MATERIAL"], scale);
    });

    it("should return false if 2 objects are not in collisions", () => {
      chai.expect(service["areInCollisions"](service["objectsOriginal"][0].obj(),
                                             service["objectsOriginal"].slice(1))).to.deep.equal(false);
    });
  });

  describe(" Method generateSceneObjects()", () => {
    const req: FreeViewRequest = {
      name: "hieee",
      quantity: 55,
      modifications: [TYPE_MODIFICATION.Add],
      theme: false,
    };
    it("should return success true when inputs are valid", () => {
      service.generateSceneObjects(req).then((res: FreeGameCreationMessage) => {
        chai.expect(res.gameCreated).to.deep.equal(true);
      }).catch(() => {
        throw new FreeGameCreationError;
      });
    });

    it("return false sucess when inputs are invalid", () => {
      req.name = "a";
      service.generateSceneObjects(req).then((res: FreeGameCreationMessage) => {
        chai.expect(res.gameCreated).to.deep.equal(false);
      }).catch(() => {
        throw new FreeGameCreationError;
      });

    });
  });

  describe(" Method generateRandomObject3D()", () => {
    it("should create an original object", () => {
      service["generateRandomObject3D"]();
      chai.expect(service["objectsOriginal"].length).to.deep.equal(1);
    });

    it("should create a modified object object", () => {
      chai.expect(service["objectsOriginal"].length).to.deep.equal(1);
    });

    it("should create 2 object with different references", () => {
      chai.expect(service["objectsOriginal"][0] === service["objectsModified"][0]).to.deep.equal(false);
    });
  });

});
