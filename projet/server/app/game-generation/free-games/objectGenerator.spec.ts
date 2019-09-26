import * as chai from "chai";
import * as THREE from "three";
import { Object3DWrapper } from "../../../../common/communication/scene";
import { ObjectGenerator } from "./objectGenerator";

const TWO: number = 2;

describe("object Generator", () => {
    const defaultPosition: THREE.Vector3 = new THREE.Vector3(TWO, TWO, TWO);
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
    const callBack: Function = (obj: Object3DWrapper): void => { chai.expect(obj.getPosition()).to.deep.equal( defaultPosition); };

    it("should be able to create an airplane with  position in param", () => {
        ObjectGenerator.airplane(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create an ufo with the position in params", () => {
        ObjectGenerator.ufo(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create a xWings with the position in params", () => {
        ObjectGenerator.xWing(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create an helicopter with the position in params", () => {
        ObjectGenerator.helicopter(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able create a biplane with the positions in params", () => {
        ObjectGenerator.biplane(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create the hot air Ballon with the position in params", () => {
        ObjectGenerator.hotAirBalloon(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create a cloud with the position passed in param", () => {
        ObjectGenerator.cloud(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create a man with ballon with the possition in params", () => {
        ObjectGenerator.manWithBalloon(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create a robot with the position passed in param", () => {
        ObjectGenerator.robot(callBack, defaultPosition, defaultPosition, material, 1);
    });

    it("should be able to create a satelite with the position passed in param", () => {
        ObjectGenerator.satellite(callBack, defaultPosition, defaultPosition, material, 1);
    });
});
