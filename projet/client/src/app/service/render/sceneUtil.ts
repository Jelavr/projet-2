import * as THREE from "three";
import { JSON3DWrapper, Object3DWrapper, TYPE_MODIFICATION } from "../../../../../common/communication/scene";
import { ObjectGenerator } from "./objectGenerator";

export class SceneUtil {
  public static readonly DEFAULT_MULTIPLIER_MODEL: number = 20;
  private static MODEL_TEXTURES_PATH: string =  "../../assets/textures/model_textures/";
  private static SCENE_TEXTURES_PATH: string =  "../../assets/textures/scene_textures/";
  private static textureNames: string[] = ["camo.jpg", "fire.jpg", "metal.jpg", "pepe.jpg", "rainbow.png", "zebra.jpg"];
  private static textures: THREE.Texture[];
  private static earthTexture: THREE.Texture;
  private static backgroundTexture: THREE.Texture;
  private static textureLoader: THREE.TextureLoader = new THREE.TextureLoader(THREE.DefaultLoadingManager);
  private static readonly INITIALIZERS: Function[] =
  [ObjectGenerator.Cube, ObjectGenerator.Cone, ObjectGenerator.Cylinder, ObjectGenerator.Sphere, ObjectGenerator.Tetrahedron,
   ObjectGenerator.airplane, ObjectGenerator.biplane, ObjectGenerator.hotAirBalloon,
   ObjectGenerator.manWithBalloon, ObjectGenerator.cloud, ObjectGenerator.helicopter, ObjectGenerator.xWing,
   ObjectGenerator.ufo, ObjectGenerator.satellite, ObjectGenerator.robot];
  private static readonly  BALLON_ADJUST_3: number = 3;
  private static readonly  BALLON_ADJUST_7: number = 7;
  private static readonly  ROBOT_ADJUST_25: number = 2.5;
  private static readonly  GLOBAL_ADJUST_10: number = 8;
  private static readonly  AIR_PLANE_ADJUST_5: number = 5;
  private static readonly  AIR_PLANE_ADJUST_3: number = 3;
  private static readonly  AIR_BALLON_ADJUST_2: number = 2;
  private static readonly MAX_X: number = 3500;
  private static readonly MAX_Y: number = 3500;
  private static readonly MAX_Z: number = 3500;

  public static isMesh(object: THREE.Object3D): boolean {
      return object.type === "Mesh";
  }

  public static isScene(object: THREE.Object3D): boolean {
      return object.type === "Scene";
  }

  public static isModification(object: THREE.Object3D, typeModification: TYPE_MODIFICATION): boolean {
      return object.userData["modificationType"] === typeModification;
  }

  public static outOfBounds(camera: THREE.Camera): boolean {
    return (Math.abs(camera.position.x) >= SceneUtil.MAX_X ||
        Math.abs(camera.position.y) >= SceneUtil.MAX_Y ||
        Math.abs(camera.position.z) >= SceneUtil.MAX_Z );
  }

  public static setVisibility(object3D: THREE.Object3D, visible: boolean): void  {
      object3D.traverse((child: THREE.Object3D): void => {
        if (SceneUtil.isMesh(child)) {
          ((child as THREE.Mesh).material as THREE.Material).visible = visible;
        }
      });
  }

  public static toggleVisibility(object3D: THREE.Object3D): void {
      object3D.traverse((child: THREE.Mesh): void => {
        if (SceneUtil.isMesh(child)) {
          (child.material as THREE.Material).visible = !((child.material as THREE.Material).visible);
        }
      });
    }

  private static getRandomMaterial(object: THREE.Object3D, color: number, modified: boolean): THREE.MeshLambertMaterial {
    return (object.userData["modificationType"] === TYPE_MODIFICATION.Color && modified) ?
    new THREE.MeshLambertMaterial({ map: SceneUtil.textures[(Math.floor(color) + 1) % SceneUtil.textures.length] }) :
    new THREE.MeshLambertMaterial({ map: SceneUtil.textures[Math.floor(color) % SceneUtil.textures.length] });
  }

  public static loadTextures(): void {
    SceneUtil.textures = new Array<THREE.Texture>();
    SceneUtil.textureNames.forEach((name: string): void => {
      SceneUtil.textures.push(SceneUtil.textureLoader.load(SceneUtil.MODEL_TEXTURES_PATH + name));
    });
    SceneUtil.earthTexture = SceneUtil.textureLoader.load(SceneUtil.SCENE_TEXTURES_PATH + "earth.jpg");
    SceneUtil.backgroundTexture = SceneUtil.textureLoader.load(SceneUtil.SCENE_TEXTURES_PATH + "background.jpg");
  }

  public static getDifferences(id: string, sceneOriginal: THREE.Scene, sceneModified: THREE.Scene, sceneCollision: THREE.Scene): boolean {
    const objOriginal: THREE.Object3D | undefined = sceneOriginal.getObjectByName(id);
    let objModified: THREE.Object3D | undefined = sceneModified.getObjectByName(id);
    if (objOriginal && objModified && objOriginal.userData["modificationType"] !== TYPE_MODIFICATION.NoModif) {
      if (objOriginal.userData["modificationType"] === TYPE_MODIFICATION.Add) {
        sceneModified.remove(objModified);
        sceneOriginal.remove(objOriginal);
        sceneCollision.remove(sceneCollision.getObjectByName(id) as THREE.Object3D);
      } else if (objOriginal.userData["modificationType"] === TYPE_MODIFICATION.Color) {
        sceneModified.remove(objModified);
        SceneUtil.setVisibility(objOriginal, true);
        objModified = objOriginal.clone();
        sceneModified.add(objModified);
      } else if (objModified && objModified.userData["modificationType"] === TYPE_MODIFICATION.Delete) {
          SceneUtil.setVisibility(objModified, true);
          SceneUtil.setVisibility(objOriginal, true);
      } else { return false; }
  } else { return false; }
    objModified.userData["modificationType"] = TYPE_MODIFICATION.NoModif;
    objOriginal.userData["modificationType"] = TYPE_MODIFICATION.NoModif;

    return true;
  }

  public static loadObjects(objects: JSON3DWrapper[], scene: THREE.Scene, modified: boolean): void {
    objects.forEach((wrapper: JSON3DWrapper) => {
      const callBack: Function = (obj: Object3DWrapper): void => {
        obj.obj().traverse((child: THREE.Object3D): void => {
          child.name = wrapper.id;
          child.userData["modificationType"] = wrapper.modificationType;
          child.userData["name"] = wrapper.objectType;
        });
        SceneUtil.colorObject(obj.obj(), wrapper.color, wrapper.scale, modified);
        scene.add(obj.obj());
      };
      SceneUtil.INITIALIZERS[JSON3DWrapper.nameToIndex(wrapper.objectType)]
      (callBack, wrapper.rotation, wrapper.position, new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors }), wrapper.scale);
    });
  }

  public static loadThematicObjects(scene: THREE.Scene): void {
    const SUN_RADIUS: number = 2000;
    const SPHERE_SEGMENTS: number = 50;
    const SUN_SHININESS: number = 100;
    const YELLOW: number = 0xFFFF00;
    const SUN_Y: number = 20000;
    const EARTH_RADIUS: number = 6000;
    const EARTH_Y: number = -8000;
    const DIVIDER: number = 2;

    const earthSurface: THREE.MeshPhongMaterial =  new THREE.MeshPhongMaterial(
      { vertexColors: THREE.FaceColors, shininess: 1,
        map: SceneUtil.earthTexture});

    const sun: THREE.Mesh =
    new THREE.Mesh(new THREE.SphereGeometry(SUN_RADIUS, SPHERE_SEGMENTS, SPHERE_SEGMENTS),
                   new THREE.MeshPhongMaterial({vertexColors: THREE.FaceColors, color: YELLOW,
                                                shininess: SUN_SHININESS,
                                                emissiveIntensity: 10, emissive: YELLOW}))
                                          .translateY(SUN_Y);
    const earth: THREE.Mesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, SPHERE_SEGMENTS, SPHERE_SEGMENTS),
                                             earthSurface).translateY(EARTH_Y).rotateX(Math.PI / DIVIDER);
    scene.background = SceneUtil.backgroundTexture;
    scene.add(earth);
    scene.add(sun);
  }

  public static cameraCollision(objects: THREE.Object3D[], cameraSphere: THREE.Sphere ): boolean {

    let collision: boolean = false;
    for (const worldObject of objects) { // foreach vertices of the childMeshGeometry
        if (worldObject.type === "Mesh") {
            const sphereWorldObject: THREE.Sphere = (worldObject as THREE.Mesh).geometry.boundingSphere;
            if (cameraSphere.intersectsSphere(sphereWorldObject)) {
                collision = true;
            }
        }
    }

    return collision;
  }

  private static colorObject(object: THREE.Object3D, color: number, scale: number, modified: boolean): void {
    if (object.type === "Scene") {
        const scene: THREE.Scene = (object as THREE.Scene);
        scene.scale.set(scale, scale, scale);
        scene.children.forEach((child: THREE.Object3D): void => {
          if (child.type === "Mesh") {
            const MESH: THREE.Mesh = child as THREE.Mesh;
            MESH.material = SceneUtil.getRandomMaterial(object, color, modified);
          }
        });
      } else if (object.type === "Mesh") {
        const geo: THREE.Geometry = (object as THREE.Mesh).geometry as THREE.Geometry;
        geo.faces.forEach( (face: THREE.Face3) => {
            face.color.setHex(color);
          });
      }
  }

  private static balloonBoundingSpheres(obj: THREE.Object3D): THREE.Mesh[] {
    return [
       SceneUtil.makeSphere(new THREE.Vector3(obj.position.x, obj.position.y + obj.scale.x * SceneUtil.BALLON_ADJUST_3, obj.position.z),
                            obj.scale.x * SceneUtil.BALLON_ADJUST_3, obj.name),
       SceneUtil.makeSphere(new THREE.Vector3(obj.position.x, obj.position.y + obj.scale.x * SceneUtil.BALLON_ADJUST_7, obj.position.z),
                            obj.scale.x * SceneUtil.BALLON_ADJUST_3, obj.name) ];
  }
  private static AirballoonBoundingSpheres(obj: THREE.Object3D): THREE.Mesh[] {
    return [
       SceneUtil.makeSphere(new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z),
                            obj.scale.x * SceneUtil.AIR_BALLON_ADJUST_2, obj.name),
       SceneUtil.makeSphere(new THREE.Vector3(obj.position.x, obj.position.y + obj.scale.x * SceneUtil.BALLON_ADJUST_3, obj.position.z),
                            obj.scale.x * SceneUtil.AIR_BALLON_ADJUST_2, obj.name) ];
  }

  private static airPlaneBoundingSpheres(obj: THREE.Object3D): THREE.Mesh[] {
    return [
      SceneUtil.makeSphere(obj.position, obj.scale.x * SceneUtil.AIR_PLANE_ADJUST_5, obj.name),
      SceneUtil.makeSphere(new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z + obj.scale.x * SceneUtil.AIR_PLANE_ADJUST_5),
                           obj.scale.x * SceneUtil.AIR_PLANE_ADJUST_5, obj.name),
      SceneUtil.makeSphere(new THREE.Vector3(obj.position.x  - obj.scale.x * SceneUtil.AIR_PLANE_ADJUST_3, obj.position.y,
                                             obj.position.z - obj.scale.x * SceneUtil.AIR_PLANE_ADJUST_3),
                           obj.scale.x * SceneUtil.AIR_PLANE_ADJUST_5, obj.name)];
  }

  private static ufoBoundingSpheres(obj: THREE.Object3D): THREE.Mesh[] {
    return [
      SceneUtil.makeSphere(new THREE.Vector3(obj.position.x, obj.position.y + obj.scale.x * SceneUtil.ROBOT_ADJUST_25, obj.position.z),
                           obj.scale.x * SceneUtil.ROBOT_ADJUST_25, obj.name)];
  }

  public static CalculateBoudingSphere(obj: THREE.Object3D): THREE.Mesh[] {
    let boundingSpheres: THREE.Mesh[] = [ SceneUtil.makeSphere(obj.position,  obj.scale.x * SceneUtil.GLOBAL_ADJUST_10, obj.name) ];
    switch (obj.userData["name"]) {
      case "airplane": boundingSpheres = SceneUtil.airPlaneBoundingSpheres(obj);
                       break;
      case "hotAirBalloon": boundingSpheres = SceneUtil.AirballoonBoundingSpheres(obj);
                            break;
      case "manWithBalloon": boundingSpheres = SceneUtil.balloonBoundingSpheres(obj);
                             break;
      case "biplane": boundingSpheres = [ SceneUtil.makeSphere(obj.position,  obj.scale.x * SceneUtil.GLOBAL_ADJUST_10, obj.name) ];
                      break;
      case "ufo": boundingSpheres = SceneUtil.ufoBoundingSpheres(obj);
                  break;
      case "satellite": boundingSpheres = [ SceneUtil.makeSphere(obj.position,  obj.scale.x * SceneUtil.AIR_PLANE_ADJUST_5, obj.name) ];
                        break;
      case "robot": boundingSpheres = [ SceneUtil.makeSphere(obj.position,  obj.scale.x * SceneUtil.ROBOT_ADJUST_25, obj.name) ];
                    break;
      case "cloud": boundingSpheres = [ SceneUtil.makeSphere(obj.position,  obj.scale.x * SceneUtil.ROBOT_ADJUST_25, obj.name) ];
                    break;
      default:
        break;
    }

    return boundingSpheres;
  }

  private static makeSphere(position: THREE.Vector3, radius: number, id: string): THREE.Mesh {
    const CHARPENTE: number = 10;
    const sphereGeo: THREE.SphereGeometry = new THREE.SphereGeometry(radius, CHARPENTE, CHARPENTE);
    const mesh: THREE.Mesh = new THREE.Mesh( sphereGeo, new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors}));
    mesh.translateX(position.x).translateY(position.y).translateZ(position.z);
    mesh.name = id;

    return mesh;
  }

  public static fillCollisionScene(sceneOriginal: THREE.Scene, sceneCollision: THREE.Scene): void {

    sceneOriginal.children.forEach( (obj: THREE.Object3D) => {
        let mesh: THREE.Mesh = new THREE.Mesh();
        if (obj.type === "Scene") {
          const boundingSpheres: THREE.Mesh[] = SceneUtil.CalculateBoudingSphere(obj);
          boundingSpheres.forEach( (sphere: THREE.Mesh) => {
            Object3DWrapper.computeBoundingSpheres(sphere, (sphere.geometry as THREE.SphereGeometry)["parameters"].radius);
            sceneCollision.add(sphere);
          });

        } else if (obj.type === "Mesh") {
          const clonedGeo: THREE.Geometry = (obj as THREE.Mesh).geometry.clone() as THREE.Geometry;
          mesh = obj.clone() as THREE.Mesh;
          mesh.geometry = clonedGeo;
          Object3DWrapper.computeBoundingSpheres(mesh);
          sceneCollision.add(mesh);
        }
    });
  }

  public static setVisibilityForModificationType(object3D: THREE.Object3D, typeModification: TYPE_MODIFICATION, visible: boolean): void {
      object3D.traverse( (child: THREE.Object3D) => {
          if (SceneUtil.isModification(child, typeModification)) {
              if (SceneUtil.isScene(child)) {
                  SceneUtil.setVisibility(child as THREE.Scene, visible);
              } else if (SceneUtil.isMesh(child)) {
                  ((child as THREE.Mesh).material as THREE.Material).visible = visible;
              }
          }
      });
  }
}
