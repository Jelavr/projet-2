import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { JSON3DWrapper, Object3DWrapper, TYPE_MODIFICATION } from "../../../../../common/communication/scene";
import { RenderService } from "./render.service";
import { SceneUtil } from "./sceneUtil";

describe("RenderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  const service: RenderService = new RenderService();
  afterEach( () => {
    spyOn(service, "render" ).and.callFake((): void => { return; });
    spyOn(service, "renderCustom").and.stub();
  });

  const htmlDivOriginal: HTMLDivElement = document.createElement("div");
  const htmlDivModified: HTMLDivElement = document.createElement("div");
  const radius: number = 10;
  const coneGeometry: THREE.ConeGeometry = new THREE.ConeGeometry(radius, radius, radius, radius);
  const position: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  const rotation: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors});
  const meshOriginal: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
  const meshNoDif: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
  meshOriginal.userData["modificationType"] = TYPE_MODIFICATION.Add;
  const meshModified: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
  meshModified.userData["modificationType"] = TYPE_MODIFICATION.Delete;
  meshOriginal.name = meshModified.name = "modObj";
  meshNoDif.name = "noModObj";
  const objWrapperOriginal: Object3DWrapper = new Object3DWrapper(meshOriginal, rotation, position, 0, "Cone");
  const objWrapperModified: Object3DWrapper = new Object3DWrapper(meshModified, rotation, position, 0, "Cone");
  const objWrapperNodif: Object3DWrapper = new Object3DWrapper(meshNoDif, rotation, position, 0, "Cone");
  const arrayOriginal: JSON3DWrapper[] = new Array<JSON3DWrapper>();
  const arrayModified: JSON3DWrapper[] = new Array<JSON3DWrapper>();
  const themeObject: THREE.Scene = new THREE.Scene();
  themeObject.name = "theme";
  themeObject.userData["modificationType"] = TYPE_MODIFICATION.Delete;
  themeObject.add(meshOriginal.clone());
  arrayOriginal.push(new JSON3DWrapper(new Object3DWrapper(themeObject, rotation, position, 0, "airplane")));
  arrayModified.push(new JSON3DWrapper(new Object3DWrapper(themeObject.clone(), rotation, position, 0, "airplane")));
  arrayOriginal.push(new JSON3DWrapper(objWrapperOriginal));
  arrayModified.push(new JSON3DWrapper(objWrapperModified));
  arrayModified.push(new JSON3DWrapper(objWrapperNodif));
  arrayOriginal.push(new JSON3DWrapper(objWrapperNodif));
  const objModifColor1: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
  objModifColor1.userData["modificationType"] = TYPE_MODIFICATION.Color;
  objModifColor1.name = "color";
  const objModifColor2: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
  objModifColor2.userData["modificationType"] = TYPE_MODIFICATION.Color;
  objModifColor2.name = "color";
  const delay: number = 50;
  const visibleMod: boolean = (objModifColor2.material as THREE.Material).visible;
  arrayOriginal.push(new JSON3DWrapper(new Object3DWrapper(objModifColor1, rotation, position, 0, "Cone")));
  arrayModified.push(new JSON3DWrapper(new Object3DWrapper(objModifColor2, rotation, position, 0, "Cone")));
  const visibleOri: boolean = (objModifColor1.material as THREE.Material).visible;
  arrayOriginal.push(new JSON3DWrapper(new Object3DWrapper(objModifColor1, rotation, position, 0, "Cone")));
  arrayModified.push(new JSON3DWrapper(new Object3DWrapper(objModifColor2, rotation, position, 0, "Cone")));

  it("should be created", () => {
    const serviceTest: RenderService = TestBed.get(RenderService);
    expect(serviceTest).toBeTruthy();
  });

  describe("method initialize", () => {

  it("should create the original scene", () => {
    service.initialize(htmlDivOriginal, htmlDivModified, arrayOriginal, arrayModified);
    expect(service["sceneOriginal"]).toBeDefined();
  });

  it("should create the modified scene", () => {
    service.initialize(htmlDivOriginal, htmlDivModified, arrayOriginal, arrayModified);
    expect(service["sceneModified"]).toBeDefined();
  });

});

  describe("method PartialInitialize", async () => {
    it("should be able to create a thumbnail", async () => {
      expect((service.partialInitialize(arrayOriginal, htmlDivOriginal)).length).toBeGreaterThan(0);
    });
  });

  describe("method onResize", () => {
    it("should be able to call resize correctly", () => {
      service.initialize(htmlDivOriginal, htmlDivModified, arrayOriginal, arrayModified);
      spyOn(service, "getAspectRatio").and.callThrough();
      service.onResize();
      expect(service.getAspectRatio).toHaveBeenCalled();
    });
  });

  describe("method createScenes", () => {
    it("should hide the object's material if it contains a difference of type ADD in the original scene.", () => {
      service["createScenes"](arrayOriginal, arrayModified);
      const mat: THREE.Material = (service["sceneOriginal"].getObjectByName("modObj") as THREE.Mesh).material as THREE.Material;
      expect(mat.visible).toBe(false);
    });

    it("should hide the object's material if it contains a difference of type DELETE in the modified scene", () => {
      service["createScenes"](arrayOriginal, arrayModified);
      const mat: THREE.Material = (service["sceneModified"].getObjectByName("modObj") as THREE.Mesh).material as THREE.Material;
      expect(mat.visible).toBe(false);
    });

    it("shouldn't hide the object if it isn't a difference in the original scene", () => {
      service["createScenes"](arrayOriginal, arrayModified);
      const mat: THREE.Material = (service["sceneOriginal"].getObjectByName("noModObj") as THREE.Mesh).material as THREE.Material;
      expect(mat.visible).toBe(true);
    });

    it("shouldn't hide the object if it isn't a difference in the modified scene", () => {
      service["createScenes"](arrayOriginal, arrayModified);
      const mat: THREE.Material = (service["sceneModified"].getObjectByName("noModObj") as THREE.Mesh).material as THREE.Material;
      expect(mat.visible).toBe(true);
    });
  });

  describe("method blink", () => {

    it("should change the visibility of the differences in the original scene", () => {
      service["clock"].elapsedTime = delay;
      service.blink();
      service["clock"].stop();
      expect(((service["sceneOriginal"].getObjectByName("color") as THREE.Mesh).material as THREE.Material).visible).toBe(!visibleOri);
    });

    it("should change the visibility of the differences in the modified scene", () => {
      expect(((service["sceneModified"].getObjectByName("color") as THREE.Mesh).material as THREE.Material).visible).toBe(!visibleMod);
    });
  });

  describe("method cheat", () => {

    it("should start the clock's timer when called", () => {
      service.cheat();
      expect(service["clock"].running).toBe(true);
    });

    it("should stop the timer when called again", () => {
      service.cheat();
      expect(service["clock"].running).toBe(false);
    });
  });

  describe("method camerRotate", () => {
    it("should rotate the camera", () => {
      const event: MouseEvent = new MouseEvent("mousedown");
      const mouvementX: number = 20;
      const mouvementY: number = 20;
      event.initMouseEvent("click", true, true, window, 0, mouvementX, mouvementY,
                           mouvementX, mouvementY, false, false, false, false, 0, null);
      spyOn(service["camera"],  "rotateX");
      service.cameraRotate(event);
      expect(service["camera"].rotateX).toHaveBeenCalled();
    });
  });

  describe("method getObjectId", () => {

    const event: MouseEvent = new MouseEvent("mousedown");
    it("should return nothing if there is no collisions with click and object", () => {
      expect(service.getObjectId(event).length).toBe(0);
    });
  });

  describe("method checkDifferences", () => {
      it("should return false when the ids length is 0", () => {
        expect(service.checkDifferences("")).toBe(false);
      });

      it("should return false if the id is not a modified object", () => {
        expect(service.checkDifferences("fakeID")).toBe(false);
      });

      it("should remove the object from the scene if the modification is of type ADD", () => {
        const id: number = meshOriginal.id;
        service.checkDifferences("modObj");
        expect(service["sceneModified"].getObjectById(id)).toBeUndefined();
      });

      it("should remove the object of the wrong color from the scene if it has a mod of type COLOR", () => {
        const objModifColor: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
        objModifColor.userData["modificationType"] = TYPE_MODIFICATION.Color;
        objModifColor.name = "colors";
        service["sceneOriginal"].add(objModifColor);
        service["sceneModified"].add(objModifColor.clone());
        const id: number = objModifColor.id;
        service.checkDifferences("colors");
        expect(service["sceneModified"].getObjectById(id)).toBeUndefined();
    });

      it("should render the object visibile in the modified scene if it was an object with a mod of type DELETE", () => {
      const objModifDelete: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
      objModifDelete.userData["modificationType"] = TYPE_MODIFICATION.Delete;
      objModifDelete.name = "delete";
      (objModifDelete.material as THREE.Material).visible = false;
      service["sceneModified"].add(objModifDelete);
      service["sceneOriginal"].add(objModifDelete.clone());
      const id: number = objModifDelete.id;
      service.checkDifferences("delete");
      const objMaterial: THREE.Material = (service["sceneModified"].getObjectById(id) as THREE.Mesh).material as THREE.Material;
      expect(objMaterial.visible).toBe(true);
    });

      it("should return false if the object has corrupted difference type", () => {
      meshNoDif.name = "noDiff";
      const corruptedData: number = 15;
      meshNoDif.userData["modificationType"] = corruptedData ;
      service["sceneOriginal"].add(meshNoDif);
      service["sceneModified"].add(meshNoDif.clone());
      expect(service.checkDifferences("noDiff")).toBe(false);
    });
      it("should return  true when given a valid thematic object", () => {
      expect(service.checkDifferences("theme")).toBe(true);
    });
  });

  describe("CalculateBoudingSphere", () => {
    it("should create boudingSpheres for object type HotAirBalloon", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "hotAirBalloon";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1 + 1);
    });

    it("should create boudingSpheres for object type airplane", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "airplane";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1 + 1 + 1);
    });

    it("should create boudingSpheres for object type manWithBalloon", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "manWithBalloon";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1 + 1);
    });

    it("should create boudingSpheres for object type biplane", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "biplane";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1);
    });

    it("should create boudingSpheres for object type ufo", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "ufo";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1);
    });

    it("should create boudingSpheres for object type satellite", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "satellite";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1);
    });

    it("should create boudingSpheres for object type robot", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "robot";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1);
    });

    it("should create boudingSpheres for object type cloud", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "cloud";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1);
    });

    it("should create boudingSpheres for object type helicopter", () => {
      const mesh: THREE.Mesh = meshNoDif.clone();
      mesh.userData["name"] = "helicopter";
      expect(SceneUtil.CalculateBoudingSphere(mesh).length).toBe(1);
    });

  });
});
