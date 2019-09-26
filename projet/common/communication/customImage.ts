export interface Pixel {
    r: number;
    g: number;
    b: number;
    isVisited: boolean;
}

export interface ImageBMP {
    pixels: Pixel[][];
    header: Uint8Array;
}

export class Queue<T> {
    elements: T[] = [];

    public enqueue(val: T) {
        this.elements.push(val);
    }

    public dequeue(): T | undefined {
        return this.elements.shift();
    }

    public isEmpty(): boolean {
        return this.elements.length == 0;
    }
}

export class CustomImage {
    private imageContent: Blob;

    public constructor(name: string = "",
        imageContent: ArrayBuffer = new ArrayBuffer(0)) {
        this.imageContent = new Blob([new Uint8Array(imageContent)]);
    }

    public setImageContent(imageContent: ArrayBuffer): void {
        this.imageContent = new Blob([new Uint8Array(imageContent)]);
    }

    public static toFormData(originalImage: CustomImage, modifiedImage: CustomImage,
        name: string = "generatedImageUtil.bmp"): FormData {
        let output: FormData = new FormData();
        output.append("originalImage", originalImage.imageContent);
        return output;
    }
}