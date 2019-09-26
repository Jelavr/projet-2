import {expect} from "chai";
import * as THREE from "three";
import { FreeViewResponse, JSON3DWrapper, Object3DWrapper, TYPE_MODIFICATION } from "../../../common/communication/scene";
import { FreeGame } from "../game-generation/game";
import { GameGeneration } from "../game-generation/game-generation";
import { FreeGameSession } from "./freeGameSession";

describe("freeGameSession Tests: ", () => {
    const SIZE_CUBE: number = 200;
    const material: THREE.Material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});
    const originalObj: THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(SIZE_CUBE, SIZE_CUBE, SIZE_CUBE), material);
    originalObj.name = "1";
    originalObj.userData["modificationType"] = TYPE_MODIFICATION.Add;
    const modifiedObj: THREE.Mesh = originalObj.clone();
    const modifiedObj2: THREE.Mesh = originalObj.clone();
    modifiedObj2.name = "3";
    const position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    const originalWrapper: Object3DWrapper = new Object3DWrapper(originalObj, position, position, 0, "Cube");
    const originalObjects: JSON3DWrapper[] = new Array<JSON3DWrapper>();
    const jsonOriginal: JSON3DWrapper = new JSON3DWrapper(originalWrapper);
    originalObjects.push(jsonOriginal);

    const modifiedObjects: JSON3DWrapper[] = new Array<JSON3DWrapper>();
    const modifiedWrapper: Object3DWrapper = new Object3DWrapper(modifiedObj, position, position, 0, "Cube");
    const modifiedWrapper2: Object3DWrapper = new Object3DWrapper(modifiedObj2, position, position, 0, "Cube");

    modifiedObjects.push(new JSON3DWrapper(modifiedWrapper));
    modifiedObjects.push(new JSON3DWrapper(modifiedWrapper2));

    const myResponse: FreeViewResponse = {    objectsOriginal: originalObjects,
                                              objectsModified: modifiedObjects, };
    const myGame: FreeGame = {
        _id: "",
        name: "myGame",
        thumbnail: "",
        soloHighScores: GameGeneration.generateFakeHighScores(),
        multiHighScores: GameGeneration.generateFakeHighScores(),
        objets: { objectsModified: [], objectsOriginal: []},
    };
    myGame.objets = myResponse;

    
    const mySession: FreeGameSession = new FreeGameSession(["ludo"], myGame, false);

    it("Should create successfully when given valid parameters.", () => {
        expect(mySession["objectsOriginal"] !== undefined && mySession["objectsOriginal"] !== null
        && mySession["objectsModified"] !== undefined && mySession["objectsModified"] !==  null).to.be.equal(true);
    });

    it("getObjectsOriginal should return the original objects.", () => {
        expect(mySession.getObjectsOriginal()).to.deep.equal(originalObjects);
    });

    it("getObjectsModified should return the modfied objects", () => {
        expect(mySession.getObjectsModified()).to.deep.equal(modifiedObjects);
    });

    it("checkDifferences should return true if the Objectid contain a difference", () => {
        expect(mySession.checkDifferences("1", "")).to.deep.equal(true);
    });

    it("checkdifference should return false if the Objectid isn't a difference", () => {
        expect(mySession.checkDifferences("2", "")).to.deep.equal(false);
    });

    it("should end the game if 7 differences are found", () => {
        const maxDiff: number = 6;
        mySession["nbDiffFound"]["ludo"] = maxDiff;
        modifiedObj2.userData["modificationType"] = TYPE_MODIFICATION.Add;
        mySession.checkDifferences("3", "ludo");
        expect(mySession.isFinished()).to.deep.equal(true);
    });

});
