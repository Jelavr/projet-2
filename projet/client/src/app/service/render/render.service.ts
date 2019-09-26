import { Injectable } from "@angular/core";
import * as THREE from "three";
import { JSON3DWrapper, TYPE_MODIFICATION } from "../../../../../common/communication/scene";
import { SceneUtil } from "./sceneUtil";

@Injectable({
  providedIn: "root",
})
export class RenderService {
  private readonly DARK_BLUE: number = 0x003366;
  private readonly WHITE: number = 0xFFFFFFFF;
  private readonly SOFT_WHITE: number = 0x404040;
  private readonly LIGHT_INTENSITY: number = 3;
  private readonly LIGHT_POSITION_Y: number = 5000;
  private readonly CLIENT_WIDTH: number = 1920;
  private readonly CLIENT_HEIGHT: number = 1080;
  private readonly RANGE_X: number = 1080;
  private readonly RANGE_Z: number = 3000;

  private readonly cameraSpeed: number = 50;
  private readonly cheatDelay: number = 0.25;
  private readonly FOIS2: number = 2;
  private readonly cameraRadius: number = 25;
  private readonly cameraZ: number = 800;
  private readonly fieldOfView: number = 90;
  private readonly nearClippingPane: number = 1;
  private readonly farClippingPane: number = 50000;

  private containerOriginal: HTMLDivElement;
  private containerModified: HTMLDivElement;
  private sceneOriginal: THREE.Scene;
  private sceneModified: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private rendererOriginal: THREE.WebGLRenderer;
  private sceneCollision: THREE.Scene;
  private cameraSphere: THREE.Sphere;
  private rendererModified: THREE.WebGLRenderer;
  public rendererCustom: THREE.WebGLRenderer;
  public containerCustom: HTMLDivElement;
  public sceneCustom: THREE.Scene;
  public readonly clock: THREE.Clock;
  public readonly cameraTheta: number =  0.02;
  public cheatMode: boolean;

  public constructor() {
    this.rendererOriginal = new THREE.WebGLRenderer();
    this.rendererModified = new THREE.WebGLRenderer();
    this.clock = new THREE.Clock();
    this.cheatMode = false;
    this.clock.autoStart = false;
    this.sceneModified = new THREE.Scene();
    this.sceneOriginal = new THREE.Scene();
    this.sceneCollision = new THREE.Scene();
    SceneUtil.loadTextures();
   }

  private createScenes(objectsOriginal: JSON3DWrapper[], objectsModified: JSON3DWrapper[]): void {
    this.sceneOriginal = new THREE.Scene();
    this.sceneModified = new THREE.Scene();
    this.createSingleScene(this.sceneOriginal);
    this.createSingleScene(this.sceneModified);
    const nbGeoObjects: number = 5;
    if (JSON3DWrapper.nameToIndex(objectsOriginal[0].objectType) >= nbGeoObjects) {
      this.thematicInitialize();
    }
    SceneUtil.loadObjects(objectsOriginal, this.sceneOriginal, false);
    SceneUtil.loadObjects(objectsModified, this.sceneModified, true);
    SceneUtil.fillCollisionScene(this.sceneOriginal, this.sceneCollision);
    this.initializeCamera(this.getAspectRatio(), new THREE.Vector3(0, 0, this.cameraZ));
    SceneUtil.setVisibilityForModificationType(this.sceneOriginal, TYPE_MODIFICATION.Add, false);
    SceneUtil.setVisibilityForModificationType(this.sceneModified, TYPE_MODIFICATION.Delete, false);
  }

  private createSingleScene(scene: THREE.Scene): void {
    scene.background = new THREE.Color(this.DARK_BLUE);
    const upLight: THREE.DirectionalLight = new THREE.DirectionalLight(this.WHITE, this.LIGHT_INTENSITY);
    const downLight: THREE.DirectionalLight = new THREE.DirectionalLight(this.SOFT_WHITE, this.LIGHT_INTENSITY - 1);
    upLight.position.setY(this.LIGHT_POSITION_Y);
    downLight.position.setY(-this.LIGHT_POSITION_Y);
    upLight.target = scene;
    downLight.target = scene;

    scene.add(upLight);
    scene.add(downLight);
  }

  private initializeCamera(aspectRatio: number, position: THREE.Vector3): void {
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane,
    );
    this.camera.position.x = position.x;
    this.camera.position.y = position.y;
    this.camera.position.z = position.z;
    this.cameraSphere = new THREE.Sphere( position, this.cameraRadius);
    while (SceneUtil.cameraCollision(this.sceneCollision.children, this.cameraSphere) || SceneUtil.outOfBounds(this.camera)) {
      position = new THREE.Vector3(Math.random() * this.RANGE_X - Math.random() * this.RANGE_X,
                                   0, Math.random() * this.RANGE_Z);
      this.camera.position.x = position.x;
      this.camera.position.y = position.y;
      this.camera.position.z = position.z;
      this.cameraSphere.center = new THREE.Vector3(position.x, position.y, position.z);
    }
  }

  private thematicInitialize(): void {
    SceneUtil.loadThematicObjects(this.sceneOriginal);
    SceneUtil.loadThematicObjects(this.sceneModified);
  }

  public partialInitialize(objectsCustom: JSON3DWrapper[], containerCustom: HTMLDivElement ): string {
    this.containerCustom = containerCustom;
    this.sceneCustom = new THREE.Scene();
    this.sceneCustom.background = new THREE.Color(this.DARK_BLUE);
    this.initializeCamera(this.CLIENT_WIDTH / this.CLIENT_HEIGHT, new THREE.Vector3(0, 0, this.cameraZ));
    const upLight: THREE.DirectionalLight = new THREE.DirectionalLight(this.WHITE, this.LIGHT_INTENSITY);
    const downLight: THREE.DirectionalLight = new THREE.DirectionalLight(this.SOFT_WHITE, this.LIGHT_INTENSITY - 1);
    upLight.position.setY(this.LIGHT_POSITION_Y);
    downLight.position.setY(-this.LIGHT_POSITION_Y);
    this.sceneCustom.add(upLight);
    this.sceneCustom.add(downLight);

    const nbGeoObjects: number = 5;
    if (JSON3DWrapper.nameToIndex(objectsCustom[0].objectType) >= nbGeoObjects) {
      SceneUtil.loadThematicObjects(this.sceneCustom);
    }
    SceneUtil.loadObjects(objectsCustom, this.sceneCustom, false);

    this.rendererCustom = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
    this.rendererCustom.setPixelRatio(devicePixelRatio);
    const thumbnailHeight: number = 280;
    const thumbnailWidth: number = 200;
    this.rendererCustom.setSize(thumbnailHeight, thumbnailWidth);

    this.containerCustom.appendChild(this.rendererCustom.domElement);
    this.renderCustom();

    return this.rendererCustom.domElement.toDataURL();
  }

  public renderCustom(): void {
    requestAnimationFrame(() => this.renderCustom());
    this.rendererCustom.render(this.sceneCustom, this.camera);
  }

  public getAspectRatio(): number {
    return this.containerOriginal.clientWidth / this.containerOriginal.clientHeight;
  }

  private startRenderingLoop(): void {
    this.rendererOriginal.setPixelRatio(devicePixelRatio);
    this.rendererOriginal.setSize(this.containerOriginal.clientWidth, this.containerOriginal.clientHeight);
    this.rendererModified.setPixelRatio(devicePixelRatio);
    this.rendererModified.setSize(this.containerModified.clientWidth, this.containerModified.clientHeight);
    this.containerOriginal.appendChild(this.rendererOriginal.domElement);
    this.containerModified.appendChild(this.rendererModified.domElement);
    this.render();
  }
  private changeVisibility(stopCheat: boolean): void {
    this.sceneModified.children.forEach((obj: THREE.Object3D) => {
      if (obj.userData["modificationType"] === TYPE_MODIFICATION.Color || obj.userData["modificationType"] === TYPE_MODIFICATION.Add) {
        SceneUtil.toggleVisibility(obj);
        if (stopCheat) {
           SceneUtil.setVisibility(obj, true);
        }
      }});
    this.sceneOriginal.children.forEach ((obj: THREE.Object3D) => {
      if (obj.userData["modificationType"] === TYPE_MODIFICATION.Color || obj.userData["modificationType"] === TYPE_MODIFICATION.Delete) {
        SceneUtil.toggleVisibility(obj);
        if (stopCheat) {
          SceneUtil.setVisibility(obj, true);
        }

      }
    });
  }
  public blink(): void {
    if (this.clock.getElapsedTime() >= this.cheatDelay) {
      this.changeVisibility(false);
      this.clock.elapsedTime = 0;
    }
  }
  public render(): void {
    requestAnimationFrame(() => this.render() );
    this.rendererOriginal.render(this.sceneOriginal, this.camera);
    this.rendererModified.render(this.sceneModified, this.camera);
    this.blink();
  }

  public onResize(): void {
    this.camera.aspect = this.getAspectRatio();
    this.rendererOriginal.setSize(this.containerOriginal.clientWidth, this.containerOriginal.clientHeight);
    this.rendererModified.setSize(this.containerModified.clientWidth, this.containerModified.clientHeight);
  }

  public initialize(containerOriginal: HTMLDivElement, containerModified: HTMLDivElement,
                    objectsOriginal: JSON3DWrapper[], objectsModified: JSON3DWrapper[]): void {
    this.containerOriginal = containerOriginal;
    this.containerModified = containerModified;
    this.createScenes(objectsOriginal, objectsModified);
    this.startRenderingLoop();
  }

  public cheat(): void {
    if (this.clock.running) {
      this.clock.stop();
      this.clock.elapsedTime = 0;
      this.changeVisibility(true);
      this.cheatMode = false;
    } else {
      this.clock.start();
      this.cheatMode = true;
    }
  }

  public cameraFoward(): void {
    this.camera.translateZ(-this.cameraSpeed);
    this.cameraSphere.center = this.camera.position;
    if (SceneUtil.cameraCollision(this.sceneCollision.children, this.cameraSphere) || SceneUtil.outOfBounds(this.camera)) {
      this.camera.translateZ(this.cameraSpeed);
      this.cameraSphere.center = this.camera.position;
    }
  }

  public cameraBackward(): void {
    this.camera.translateZ(this.cameraSpeed);
    this.cameraSphere.center = this.camera.position;
    if (SceneUtil.cameraCollision(this.sceneCollision.children, this.cameraSphere)  || SceneUtil.outOfBounds(this.camera)) {
      this.camera.translateZ(-this.cameraSpeed);
      this.cameraSphere.center = this.camera.position;
    }
  }

  public cameraLeft(): void {
    this.camera.translateX(-this.cameraSpeed);
    this.cameraSphere.center = this.camera.position;
    if (SceneUtil.cameraCollision(this.sceneCollision.children, this.cameraSphere) || SceneUtil.outOfBounds(this.camera)) {
      this.camera.translateX(this.cameraSpeed);
      this.cameraSphere.center = this.camera.position;
    }
  }

  public cameraRight(): void {
    this.camera.translateX(this.cameraSpeed);
    this.cameraSphere.center = this.camera.position;
    if (SceneUtil.cameraCollision(this.sceneCollision.children, this.cameraSphere) || SceneUtil.outOfBounds(this.camera)) {
      this.camera.translateX(-this.cameraSpeed);
      this.cameraSphere.center = this.camera.position;
    }
  }
  public cameraRotate(event: MouseEvent): void {
    this.camera.rotateY(-event.movementX * this.cameraTheta);
    this.camera.rotateX(-event.movementY * this.cameraTheta);
  }
  public getIntersection(canvas: HTMLCanvasElement, event: MouseEvent, scene: THREE.Scene): THREE.Intersection[] {
    const mouse: THREE.Vector2 = new THREE.Vector2();
    mouse.x = ((event.clientX - canvas.offsetLeft )) / canvas.clientWidth * this.FOIS2 - 1;
    mouse.y = - ((event.clientY - canvas.offsetTop )) / canvas.clientHeight * this.FOIS2 + 1;
    const raycaster: THREE.Raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, this.camera );
    const beautiful: THREE.Object3D[] = [];
    scene.traverse( ( obj: THREE.Object3D) => {
      beautiful.push(obj);
    });

    return raycaster.intersectObjects(beautiful, true);
  }
  public getObjectId(event: MouseEvent): string {
    let intersects: THREE.Intersection[] = this.getIntersection(this.rendererOriginal.domElement, event, this.sceneOriginal);
    if (!intersects[0]) {
      intersects = this.getIntersection(this.rendererModified.domElement, event, this.sceneModified);
      if (!intersects[0]) {
        return "";
      }
  }

    return intersects[0].object.name;
}
  public checkDifferences(id: string): boolean {
    if (SceneUtil.getDifferences(id, this.sceneOriginal, this.sceneModified, this.sceneCollision)) {
      this.changeVisibility(true);
      this.rendererOriginal.render(this.sceneOriginal, this.camera);
      this.rendererModified.render(this.sceneModified, this.camera);

      return true;
    }

    return false;
  }
}
