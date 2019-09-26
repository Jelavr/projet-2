import { injectable } from "inversify";
import * as THREE from "three";
import { FreeGameCreationMessage } from "../../../../common/communication/messages";
import { FreeViewRequest,
         FreeViewResponse,
         JSON3DWrapper,
         Object3DWrapper,
         TYPE_MODIFICATION  } from "../../../../common/communication/scene";
import { FreeGameGeneration } from "./libre-game-generation";
import { ObjectGenerator } from "./objectGenerator";

@injectable()
export class GenSceneService {
    private readonly TO_HEX: number = 0xFFFFFF;
    private readonly THIRTY: number = 30;
    private readonly SIXTY: number = 60;
    private readonly NINETY: number = 90;
    private readonly COEFF1: number = 0.4;
    private readonly COEFF2: number = 0.5;
    private readonly COEFF3: number = 0.65;
    private readonly COEFF4: number = 0.83;
    private readonly COEFF5: number = 0.89;
    private readonly COEFF6: number = 1.1;

    private readonly RANGE_X: number = 1080;
    private readonly RANGE_Y: number = 1920;
    private readonly RANGE_Z: number = 3000;
    private readonly SIZE_RANGE_PERCENTAGE_MIN: number = 0.5;
    private readonly MAX_NB_OBJECTS: number = 200;
    private readonly MIN_NB_OBJECTS: number = 10;
    private readonly TWO_PI: number = Math.PI + Math.PI;
    private readonly minLength: number = 3;
    private readonly maxLength: number = 15;
    private readonly nDiff: number = 7;

    private objectsModified: Object3DWrapper[];
    private objectsOriginal: Object3DWrapper[];
    private currentId: number;
    private boxMultiplier: number;

    public response: FreeViewResponse;

    private  readonly DEFAULT_MATERIAL: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors});
    private readonly GEOMETRIC_INITIALIZERS: Function[] =
    [ObjectGenerator.Cube, ObjectGenerator.Cone, ObjectGenerator.Cylinder, ObjectGenerator.Sphere, ObjectGenerator.Tetrahedron];
    private readonly THEMATIC_INITIALIZERS: Function[] =
    [ObjectGenerator.airplane, ObjectGenerator.biplane, ObjectGenerator.hotAirBalloon,
     ObjectGenerator.manWithBalloon, ObjectGenerator.cloud, ObjectGenerator.helicopter, ObjectGenerator.xWing,
     ObjectGenerator.ufo, ObjectGenerator.satellite, ObjectGenerator.robot];
    private randomInitializers: Function[];

    public constructor() {
        this.response = this.initializeResponse();
        this.randomInitializers = this.GEOMETRIC_INITIALIZERS;
        this.currentId = 0;
        this.boxMultiplier = 1;
    }

    public initializeTriangles(geometry: THREE.Geometry,  color: number): number {
        while (geometry.faces[0].color.getHex() === color) {
                color = this.getRandomHex(color);
            }
        for (const face of geometry.faces) {
                face.color.setHex(color);
              }

        return color;
    }

    private checkSize(req: FreeViewRequest): boolean {
        return (req.quantity >= this.MIN_NB_OBJECTS && req.quantity <= this.MAX_NB_OBJECTS);
    }

    private checkModifs(req: FreeViewRequest): boolean {
        return (req.modifications.length >= 1);
    }

    private checkName(req: FreeViewRequest): boolean {
        return (req.name.length >= this.minLength && req.name.length <= this.maxLength);
    }

    private requestIsValid(req: FreeViewRequest): boolean {
        return (this.checkName(req) &&
                this.checkModifs(req) &&
                this.checkSize(req));
    }

    private initializeResponse(): FreeViewResponse {
        this.objectsOriginal = new Array<Object3DWrapper>();
        this.objectsModified = new Array<Object3DWrapper>();

        return { objectsOriginal: new Array<JSON3DWrapper>(), objectsModified: new Array<JSON3DWrapper>() };
    }

    private initializeExchange(req: FreeViewRequest): void {
        this.response = this.initializeResponse();
        this.randomInitializers = req.theme ? this.THEMATIC_INITIALIZERS : this.GEOMETRIC_INITIALIZERS;
        this.currentId = 0;
    }

    public generateDifferences(req: FreeViewRequest): void {
        const size: number = req.modifications.length;
        let random: number = 0;
        for (let i: number = 0; i < this.nDiff; i++) {
            random = this.getRandomIndex(size);
            switch (req.modifications[random]) {
                case TYPE_MODIFICATION.Add :
                    this.addRandomObject();
                    break;

                case TYPE_MODIFICATION.Delete :
                    this.deleteObject();
                    break;

                case TYPE_MODIFICATION.Color :
                    this.changeColorObject();
                    break;

                default:
                    return;
            }
        }
    }

    private addRandomObject(): void {
        this.generateRandomObject3D(); // adds a new random object to both lists
        const length: number = this.objectsOriginal.length - 1;
        this.objectsOriginal[length].setDifferenceStatus(TYPE_MODIFICATION.Add);
        this.objectsModified[length].setDifferenceStatus(TYPE_MODIFICATION.Add);
        while (this.areInCollisions(this.objectsModified[this.objectsModified.length - 1].obj(),
                                    this.objectsModified.slice(0, this.objectsModified.length - 1 - 1))) {
            const pos: THREE.Vector3 = this.getRandomPositionVector();
            this.objectsModified[length].setPosition(pos);
            this.objectsOriginal[length].setPosition(pos);
        }
    }

    private changeColorObject(): void {
        let index: number = 0;
        do {
            index = this.getRandomIndex(this.objectsModified.length);
        } while (this.objectsModified[index].obj().userData["modificationType"] !== TYPE_MODIFICATION.NoModif);
        this.objectsModified[index].setColor(this.getRandomHex(this.objectsModified[index].getColor()));
        this.objectsModified[index].setDifferenceStatus(TYPE_MODIFICATION.Color);
        this.objectsOriginal[index].setDifferenceStatus(TYPE_MODIFICATION.Color);
    }

    private deleteObject(): void {
        let index: number = 0;
        do {
            index = this.getRandomIndex(this.objectsModified.length);
         }  while (this.objectsModified[index].obj().userData["modificationType"] !== TYPE_MODIFICATION.NoModif);
        this.objectsOriginal[index].setDifferenceStatus(TYPE_MODIFICATION.Delete);
        this.objectsModified[index].setDifferenceStatus(TYPE_MODIFICATION.Delete);
    }

    private transformWrapperIntoObjects(wrapper: Object3DWrapper[]): THREE.Object3D[] {
        const objects: THREE.Object3D[] = new Array<THREE.Object3D>();
        wrapper.forEach( (obj3d: Object3DWrapper) => {
            objects.push(obj3d.obj());
        });

        return objects;
    }

    private  areInCollisions(object3D: THREE.Object3D, wrapper: Object3DWrapper []): boolean { // method when adding into the scene
        if (wrapper.length === 0) {
            return false;
        }

        let collision: boolean = false;
        const obj3DArray: THREE.Object3D[] = this.transformWrapperIntoObjects(wrapper); //

        object3D.traverse((object: THREE.Object3D): void => { // foreach element in the object3d (can be a scene)
            if (object.type === "Mesh") { // if the object type is a mesh, verify the collisions with all the other meshes.
                const childMesh: THREE.Mesh = object as THREE.Mesh;
                const meshGeometry: THREE.Geometry | THREE.BufferGeometry = childMesh.geometry;
                Object3DWrapper.computeBoundingSpheres(childMesh);
                const sphereChildGeometry: THREE.Sphere = meshGeometry.boundingSphere;
                for (const worldObject of obj3DArray) { // foreach vertices of the childMeshGeometry
                    if (worldObject.type === "Mesh" && childMesh.name !== worldObject.name) { // if it is a mesh, and it excludes itself...
                        Object3DWrapper.computeBoundingSpheres((worldObject as THREE.Mesh));
                        const sphereWorldObject: THREE.Sphere = (worldObject as THREE.Mesh).geometry.boundingSphere;
                        if (sphereChildGeometry.intersectsSphere(sphereWorldObject)) {
                            collision = true;
                        }
                    }
                }
            }
        });

        return collision;
    }

    public async generateSceneObjects(req: FreeViewRequest):
    Promise <FreeGameCreationMessage> {
        this.initializeExchange(req);
        this.setBoxMultiplier(req.quantity);
        if (!this.requestIsValid(req)) {
            return {  gameCreated: false, gameID: "", errorMessage: "request is invalid" };
        }

        for (let i: number = 0; i < req.quantity; ++i) {
            this.generateRandomObject3D();
            while (this.areInCollisions(this.objectsOriginal[i].obj(), this.objectsOriginal.slice(0, i - 1))) {
                        const pos: THREE.Vector3 = this.getRandomPositionVector();
                        this.objectsOriginal[i].setPosition(pos);
                        this.objectsModified[i].setPosition(pos);
            }
        }

        this.generateDifferences(req);

        this.response.objectsModified = this.stringify(this.objectsModified);
        this.response.objectsOriginal = this.stringify(this.objectsOriginal);

        return FreeGameGeneration.addFreeGameToDataBase(req.name, this.response).then((id: string) => {
            return { gameCreated: true, gameID: id, objectsOriginal: this.response.objectsOriginal };
        }).catch((err: Error) => {
            console.error(err.message);

            return { gameCreated: false, gameID: "", errorMessage: "request is invalid" };
        });
    }
    private stringify(objects: Object3DWrapper[]): JSON3DWrapper[] {
        const wrapper: JSON3DWrapper[] = new Array<JSON3DWrapper>();
        objects.forEach((element: Object3DWrapper) => {
            wrapper.push(new JSON3DWrapper(element));
        });

        return wrapper;
    }
    private  getRandomIndex(max: number): number {
        return Math.floor(Math.random() * max);
    }
    private addRandomObject3DToLists(): void {
        const rotation: THREE.Vector3 = this.getRandomRotationVector();
        const position: THREE.Vector3 = this.getRandomPositionVector();
        const scale: number = this.generateRandomScale();
        const index: number = this.getRandomIndex(this.randomInitializers.length);
        const color: number = (Math.random() * this.TO_HEX);

        const addObjectOriginal: Function = (object: Object3DWrapper): void => {
            this.objectsOriginal.push(object);
        };
        const addObjectModified: Function = (object: Object3DWrapper): void => {
            this.objectsModified.push(object);
        };
        this.randomInitializers[index](addObjectOriginal, rotation, position, this.DEFAULT_MATERIAL, scale);
        this.randomInitializers[index](addObjectModified, rotation, position, this.DEFAULT_MATERIAL, scale);

        this.objectsOriginal[this.objectsOriginal.length - 1].setColor(color);
        this.objectsModified[this.objectsModified.length - 1].setColor(color);
    }
    private generateRandomObject3D(): void {
        this.addRandomObject3DToLists();
        const lengthOriginal: number = this.objectsOriginal.length - 1;
        const lengthModified: number = this.objectsModified.length - 1;
        this.objectsOriginal[lengthOriginal].setId(this.currentId.toString());
        this.objectsModified[lengthModified].setId(this.currentId.toString());
        this.objectsOriginal[lengthOriginal].setDifferenceStatus(TYPE_MODIFICATION.NoModif);
        this.objectsModified[lengthModified].setDifferenceStatus(TYPE_MODIFICATION.NoModif);
        this.currentId++;
    }
    public getRandomHex(originalColor: number): number {
        const NB_TEXTURES: number = 6;
        const modulo: number = Math.floor(originalColor) % NB_TEXTURES;
        let newColor: number;
        let newModulo: number;
        do {
            newColor = Math.floor((Math.random() * this.TO_HEX));
            newModulo = newColor % NB_TEXTURES;
            newColor += (modulo - newModulo);
        } while (originalColor === newColor && newColor < 0);

        return newColor;
    }
    private generateRandomScale(): number {
        return (Math.random() + this.SIZE_RANGE_PERCENTAGE_MIN);
    }
    private setBoxMultiplier(nbObjects: number): void {
        this.boxMultiplier = nbObjects < this.THIRTY ? this.COEFF1 :
                             nbObjects >= this.THIRTY && nbObjects < this.SIXTY ? this.COEFF2 :
                             nbObjects >= this.SIXTY && nbObjects < this.NINETY ? this.COEFF3 :
                             nbObjects >= this.NINETY && nbObjects < this.NINETY + this.THIRTY ? this.COEFF4 :
                             nbObjects >= this.NINETY + this.THIRTY && nbObjects < this.NINETY + this.SIXTY ? this.COEFF5 :
                             nbObjects >= this.NINETY + this.SIXTY && nbObjects < this.NINETY + this.NINETY ? 1 : this.COEFF6;
    }
    private  getRandomPositionVector(): THREE.Vector3 {
        return new THREE.Vector3(Math.random() * (this.RANGE_X * this.boxMultiplier) - Math.random() * (this.RANGE_X * this.boxMultiplier),
                                 Math.random() * this.RANGE_Y - Math.random() * this.RANGE_Y,
                                 Math.random() * (this.RANGE_Z * this.boxMultiplier));
    }
    private  getRandomRotationVector(): THREE.Vector3 {
        return new THREE.Vector3(Math.random() * this.TWO_PI, Math.random() * this.TWO_PI,
                                 Math.random() * this.TWO_PI);
    }
}
