
export enum TYPE_MODIFICATION {
    Add,
    Delete,
    Color,
    NoModif,
}

export class JSON3DWrapper {
    public color: number;
    public rotation: THREE.Vector3;
    public position: THREE.Vector3;
    public scale: number;
    public objectType: string;
    public id: string;
    public modificationType: TYPE_MODIFICATION;

    public static readonly INITIALIZERS_NAME: string[] = 
    ["Cube", "Cone", "Cylinder", "Sphere", "Tetrahedron",
     "airplane", "biplane", "hotAirBalloon",
     "manWithBalloon", "cloud", "helicopter", "xWing",
     "ufo", "satellite", "robot"];

    public constructor (obj3D: Object3DWrapper) {
        this.rotation = obj3D.getRotation();
        this.position = obj3D.getPosition();
        this.color = obj3D.getColor();;
        this.scale = obj3D.getScale();
        this.id = obj3D.obj().name;
        this.modificationType = obj3D.obj().userData["modificationType"];
        this.objectType = obj3D.getObjectType();
    }

    public static nameToIndex(name: string): number {
        let index: number = -1;
        for(let i: number = 0; i < JSON3DWrapper.INITIALIZERS_NAME.length; ++i) {
            if(JSON3DWrapper.INITIALIZERS_NAME[i] === name) {
                index = i;
                break;
            }
        }

        return index;
    }

    public static indexToName(index: number): string {
        return JSON3DWrapper.INITIALIZERS_NAME[index];
    }
}

export class Object3DWrapper {
    private object: THREE.Object3D;
    private position: THREE.Vector3;
    private rotation: THREE.Vector3;
    private color: number;
    private scale: number;
    private objectType: string;

    public constructor(obj: THREE.Object3D, rotation: THREE.Vector3, position: THREE.Vector3, 
        color: number, objectType: string, scale: number = 1) {
        this.object = obj;
        this.objectType = objectType;
        this.setPosition(position);
        this.setRotation(rotation);
        this.color = color;
        this.scale = scale;
    }

    public static computeBoundingSpheres(object3D: THREE.Object3D, radius?: number): void {
        object3D.traverse((child: THREE.Object3D): void => {
            if(child.type === "Mesh") {
                const geo: THREE.Geometry = (child as THREE.Mesh).geometry as THREE.Geometry;
                geo.computeBoundingSphere();
                geo["boundingSphere"].center.set(child.position.x, child.position.y, child.position.z);
                if (radius) {
                    geo["boundingSphere"].radius = radius;
                }
            }
        });
    }

    public stringify(): void {
        delete this.object;
    }

    public setPosition(pos: THREE.Vector3): void {
        this.position = pos;
        this.object.position.set(pos.x, pos.y, pos.z);
    }

    public setRotation(rot: THREE.Vector3): void {
        this.rotation = rot;
        this.object.rotation.set(rot.x, rot.y, rot.z);
    }

    public setDifferenceStatus(modif: TYPE_MODIFICATION): void {
        this.obj().userData["modificationType"] =  modif ;
        this.obj().traverse((childElement: THREE.Object3D): void => {
            childElement.userData["modificationType"] =  modif ;
        });
    }

    public setId(id: string): void {
        this.obj().name = id;
        this.obj().traverse((childElement: THREE.Object3D): void => {
            childElement.name = id;
        });
    }

    public setColor(color: number): void  {
        this.color = color;
    }

    public getColor(): number {
        return this.color;
    }

    public getPosition(): THREE.Vector3 {
        return this.position;
    }

    public getRotation(): THREE.Vector3 {
        return this.rotation;
    }

    public getScale(): number {
        return this.scale;
    }

    public getObjectType(): string {
        return this.objectType;
    }

    public obj(): THREE.Object3D {
        return this.object;
    }

    public replace(obj: THREE.Object3D): void {
        this.object = obj;
    }
}

export interface FreeViewRequest {
    name: string;
    quantity: number;
    modifications: TYPE_MODIFICATION[];
    theme: boolean;
}

export interface FreeViewResponse {
    objectsOriginal: JSON3DWrapper[];
    objectsModified: JSON3DWrapper[];
}