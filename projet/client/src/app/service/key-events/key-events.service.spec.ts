import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { RenderService } from "../render/render.service";
import { KeyEventsService } from "./key-events.service";

describe("KeyEventsService", () => {
  const renderService: RenderService = new RenderService();
  const keyEventsService: KeyEventsService = new KeyEventsService(renderService);
  const outOfBounds: number = 8000;
  const sphereRadius: number = 40;
  const sphereWidth: number = 10;
  const CLIENT_WIDTH: number = 1080;
  const CLIENT_HEIGHT: number = 1920;

  const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors});
  const mesh: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, sphereWidth, sphereWidth), material);
  mesh.geometry.computeBoundingSphere();
  mesh.geometry["boundingSphere"].center.set(outOfBounds + outOfBounds, outOfBounds + outOfBounds, outOfBounds + outOfBounds);
  renderService["sceneCollision"].add(mesh);
  renderService["initializeCamera"](CLIENT_WIDTH / CLIENT_HEIGHT, new THREE.Vector3(0, 0, 0));
  beforeEach(() => TestBed.configureTestingModule({}));
  let event: KeyboardEvent;

  it("should be created", () => {
    const service: KeyEventsService = TestBed.get(KeyEventsService);
    const spy: jasmine.Spy = spyOn(service["renderService"], "getAspectRatio");
    spy.and.callFake((): number => {
      return CLIENT_WIDTH / CLIENT_HEIGHT;
    });
    expect(service).toBeTruthy();
  });

  it("should move the camera +50 when the key -s- is pressed" , () => {
    event = new KeyboardEvent("keydown", {"key": "s"});
    keyEventsService.handle(event);
    const position: number = 50;
    expect(renderService["camera"].position.z).toEqual(position);
  });

  it("should move the camera -50 in z when the key -w- is pressed", () => {
    event = new KeyboardEvent("keydown", {"key": "w"});
    keyEventsService.handle(event);
    expect(renderService["camera"].position.z).toEqual(0);
  });

  it("should move the camera -50 in x when the key -a- is pressed", () => {
    event = new KeyboardEvent("keybown", {"key": "a"});
    keyEventsService.handle(event);
    const position: number = -50;
    expect(renderService["camera"].position.x).toEqual(position);
  });

  it("should move the camera +50 in x when the key -d- is pressed", () => {
    event = new KeyboardEvent("keydown", {"key": "d"});
    keyEventsService.handle(event);
    expect(renderService["camera"].position.x).toEqual(0);
  });

  it("should be able to activate the cheat mode when -t- is pressed", () => {
    event = new KeyboardEvent("keydown", {"key": "t"});
    keyEventsService.handle(event);
    expect(renderService["clock"].running).toEqual(true);
  });

  it("should be able to deactivate the cheat mode when -t- is pressed again", () => {
    event = new KeyboardEvent("keydown", {"key": "t"});
    keyEventsService.handle(event);
    expect(renderService["clock"].running).toEqual(false);
  });

  it("should do nothing when a ramdom key is pressed", () => {
    event = new KeyboardEvent("keydown", {"key": "b"});
    keyEventsService.handle(event);
    const positions: THREE.Vector3 = renderService["camera"].position;
    expect(renderService["camera"].position).toEqual(positions);
  });

  it("should do nothing when we try to press a key while the camera is undefined", () => {
    const renderServiceWithoutCam: RenderService = new RenderService();
    const keyEventsServiceWithoutCam: KeyEventsService = new KeyEventsService(renderServiceWithoutCam);
    event = new KeyboardEvent("keydown", {"key": "t"});
    keyEventsServiceWithoutCam.handle(event);
    expect(renderServiceWithoutCam["camera"]).toBeUndefined();
  });

  it("should do nothing when the camera tries to move out of bounds with w", () => {
    event = new KeyboardEvent("keydown", {"key": "w"});
    const posoutOfBounds: THREE.Vector3 = new THREE.Vector3( outOfBounds, outOfBounds, outOfBounds);
    renderService["camera"].position.set(posoutOfBounds.x, posoutOfBounds.y, posoutOfBounds.z);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(posoutOfBounds);
  });

  it("should do nothing when the camera tries to move out of bounds with a", () => {
    event = new KeyboardEvent("keydown", {"key": "a"});
    const posoutOfBounds: THREE.Vector3 = new THREE.Vector3( outOfBounds, outOfBounds, outOfBounds);
    renderService["camera"].position.set(posoutOfBounds.x, posoutOfBounds.y, posoutOfBounds.z);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(posoutOfBounds);
  });

  it("should do nothing when the camera tries to move out of bounds with s", () => {
    event = new KeyboardEvent("keydown", {"key": "s"});
    const posoutOfBounds: THREE.Vector3 = new THREE.Vector3( outOfBounds, outOfBounds, outOfBounds);
    renderService["camera"].position.set(posoutOfBounds.x, posoutOfBounds.y, posoutOfBounds.z);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(posoutOfBounds);
  });

  it("should do nothing when the camera tries to move out of bounds with d", () => {
    event = new KeyboardEvent("keydown", {"key": "d"});
    const posoutOfBounds: THREE.Vector3 = new THREE.Vector3( outOfBounds, outOfBounds, outOfBounds);
    renderService["camera"].position.set(posoutOfBounds.x, posoutOfBounds.y, posoutOfBounds.z);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(posoutOfBounds);
  });

  it("should do nothing when the camera tries to move into a scene object with w", () => {
    event = new KeyboardEvent("keydown", {"key": "w"});
    const z: number = 800;
    const meshZ: number = 775;
    renderService["camera"].position.set(0, 0, z);
    mesh.geometry["boundingSphere"].center.set(0, 0, meshZ);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(new THREE.Vector3(0, 0, z));
  });

  it("should do nothing when the camera tries to move into a scene object with s", () => {
    event = new KeyboardEvent("keydown", {"key": "s"});
    const z: number = 800;
    const meshZ: number = 825;
    renderService["camera"].position.set(0, 0, z);
    mesh.geometry["boundingSphere"].center.set(0, 0, meshZ);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(new THREE.Vector3(0, 0, z));
  });

  it("should do nothing when the camera tries to move into a scene object with a", () => {
    event = new KeyboardEvent("keydown", {"key": "a"});
    const meshX: number = -25;
    renderService["camera"].position.set(0, 0, 0);
    mesh.geometry["boundingSphere"].center.set(meshX, 0, 0);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(new THREE.Vector3(0, 0, 0));
  });

  it("should do nothing when the camera tries to move into a scene object with d", () => {
    event = new KeyboardEvent("keydown", {"key": "d"});
    const meshX: number = 25;
    renderService["camera"].position.set(0, 0, 0);
    mesh.geometry["boundingSphere"].center.set(0, 0, meshX);
    keyEventsService.handle(event);
    expect(renderService["camera"].position).toEqual(new THREE.Vector3(0, 0, 0));
  });
});
