import * as THREE from "three";
import { JSON3DWrapper, Object3DWrapper } from "../../../../../common/communication/scene";
import * as MODELS from "../../../../../common/models/models";

export class ObjectGenerator {
    private static readonly CHARPENTE_SPHERE: number = 1000;
    private static readonly CHARPENTE_BASE_CYLINDRE: number = 1000;
    private static readonly CHARPENTE_HAUTEUR_CYLINDRE: number = 1000;
    private static readonly CHARPENTE_HAUTEUR_CONE: number = 1000;
    private static readonly CHARPENTE_BASE_CONE: number = 1000;
    private static readonly DEFAULT_HEIGHT: number = 100;
    private static readonly DEFAULT_RADIUS: number = 33;
    public static  Cube(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                        material: THREE.MeshBasicMaterial, scale: number): void {
    const side: number = scale * ObjectGenerator.DEFAULT_RADIUS;
    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(side, side, side);
    callBack(new Object3DWrapper(new THREE.Mesh(cubeGeometry,
                                                material).rotateX(rotation.x).rotateY(rotation.y).rotateZ(rotation.z).
                                          translateX(position.x).translateY(position.y).translateZ(position.z),
                                 rotation, position, 0, "Cube"));
    }
    public static  Sphere(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                          material: THREE.MeshBasicMaterial, scale: number): void {
    const radius: number = scale * ObjectGenerator.DEFAULT_RADIUS;
    const sphereGeometry: THREE.SphereGeometry =
    new THREE.SphereGeometry(radius, this.CHARPENTE_SPHERE, this.CHARPENTE_SPHERE);

    callBack(new Object3DWrapper(new THREE.Mesh(sphereGeometry,
                                                material).rotateX(rotation.x).rotateY(rotation.y).rotateZ(rotation.z).
                                            translateX(position.x).translateY(position.y).translateZ(position.z),
                                 rotation, position, 0, "Sphere"));
    }
    public static  Tetrahedron(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                               material: THREE.MeshBasicMaterial, scale: number): void {
    const side: number = scale * ObjectGenerator.DEFAULT_RADIUS;
    const tetrahedronGeometry: THREE.TetrahedronGeometry = new THREE.TetrahedronGeometry(side);

    callBack(new Object3DWrapper(new THREE.Mesh(tetrahedronGeometry,
                                                material).rotateX(rotation.x).rotateY(rotation.y).rotateZ(rotation.z).
                                                translateX(position.x).translateY(position.y).translateZ(position.z),
                                 rotation, position, 0, "Tetrahedron"));
    }
    public static  Cylinder(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                            material: THREE.MeshBasicMaterial, scale: number): void {
    const radius: number = scale * ObjectGenerator.DEFAULT_RADIUS;
    const height: number = scale * ObjectGenerator.DEFAULT_HEIGHT;
    const tetrahedronGeometry: THREE.CylinderGeometry =
                        new THREE.CylinderGeometry(radius, radius, height,
                                                   this.CHARPENTE_BASE_CYLINDRE, this.CHARPENTE_HAUTEUR_CYLINDRE);
    callBack(new Object3DWrapper(new THREE.Mesh(tetrahedronGeometry,
                                                material).rotateX(rotation.x).rotateY(rotation.y).rotateZ(rotation.z).
                                            translateX(position.x).translateY(position.y).translateZ(position.z),
                                 rotation, position, 0, "Cylinder"));
    }
    public static  Cone(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                        material: THREE.MeshBasicMaterial, scale: number): void {
              const radius: number = scale * ObjectGenerator.DEFAULT_RADIUS;
              const height: number = scale * ObjectGenerator.DEFAULT_HEIGHT;
              const coneGeometry: THREE.ConeGeometry =
    new THREE.ConeGeometry(radius, height, this.CHARPENTE_BASE_CONE, this.CHARPENTE_HAUTEUR_CONE);

              callBack(new Object3DWrapper(new THREE.Mesh(coneGeometry, material).
              rotateX(rotation.x).rotateY(rotation.y).rotateZ(rotation.z).
                                        translateX(position.x).translateY(position.y).translateZ(position.z),
                                           rotation, position, 0, "Cone"));
    }
    public static loadModel(name: string, callBack: Function,
                            rotation: THREE.Vector3, position: THREE.Vector3, material: THREE.MeshBasicMaterial, scale: number): void  {
    const loader: THREE.ObjectLoader = new THREE.ObjectLoader();
    const nbGeoObjects: number = 5;
    rotation.x = 0;
    rotation.z = 0;
    loader.parse(MODELS.Models.models[JSON3DWrapper.nameToIndex(name) - nbGeoObjects], (scene: THREE.Object3D) => {
    scene.scale.set(scale, scale, scale);
    scene.rotateX(rotation.x).rotateY(rotation.y).rotateZ(rotation.z).translateX(position.x)
    .translateY(position.y).translateZ(position.z);
    callBack(new Object3DWrapper(scene, rotation, position, 0, name, scale));
    });
    }
    public static airplane(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                           material: THREE.MeshBasicMaterial, scale: number): void {
    const AIRPLANE_SIZE: number = 20;
    ObjectGenerator.loadModel("airplane", callBack, rotation, position, material, scale * AIRPLANE_SIZE);
    }

    public static ufo(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                      material: THREE.MeshBasicMaterial, scale: number): void {
    const UFO_SIZE: number = 20;
    ObjectGenerator.loadModel("ufo", callBack, rotation, position, material, UFO_SIZE * scale);
    }

    public static xWing(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                        material: THREE.MeshBasicMaterial, scale: number): void {
    const XWING_SIZE: number = 10;
    ObjectGenerator.loadModel("xWing", callBack, rotation, position, material, XWING_SIZE * scale);
    }

    public static helicopter(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                             material: THREE.MeshBasicMaterial, scale: number): void {
    const HELICOPTER_SIZE: number = 20;
    ObjectGenerator.loadModel("helicopter", callBack, rotation, position, material, HELICOPTER_SIZE * scale);
    }

    public static biplane(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                          material: THREE.MeshBasicMaterial, scale: number): void {
    const BIPLANE_SIZE: number = 20;
    ObjectGenerator.loadModel("biplane", callBack, rotation, position, material, BIPLANE_SIZE * scale);
    }

    public static hotAirBalloon(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                                material: THREE.MeshBasicMaterial, scale: number): void {
    const HOT_AIR_BALLOON_SIZE: number = 25;
    ObjectGenerator.loadModel("hotAirBalloon", callBack, rotation, position, material, HOT_AIR_BALLOON_SIZE * scale);
    }

    public static cloud(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                        material: THREE.MeshBasicMaterial, scale: number): void {
    const CLOUD_SIZE: number = 20;
    ObjectGenerator.loadModel("cloud", callBack, rotation, position, material, CLOUD_SIZE * scale);
    }
    public static manWithBalloon(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                                 material: THREE.MeshBasicMaterial, scale: number): void {
    const MAN_WITH_BALLOON_SIZE: number = 20;
    ObjectGenerator.loadModel("manWithBalloon", callBack, rotation, position, material, MAN_WITH_BALLOON_SIZE * scale);
    }
    public static satellite(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                            material: THREE.MeshBasicMaterial, scale: number): void {
    const SATELLITE_SIZE: number = 20;
    ObjectGenerator.loadModel("satellite", callBack, rotation, position, material, SATELLITE_SIZE * scale);
    }
    public static robot(callBack: Function, rotation: THREE.Vector3, position: THREE.Vector3,
                        material: THREE.MeshBasicMaterial, scale: number): void {
    const ROBOT_SIZE: number = 20;
    ObjectGenerator.loadModel("robot", callBack, rotation, position, material, ROBOT_SIZE * scale);
    }
}
