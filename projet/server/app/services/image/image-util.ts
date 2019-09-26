import * as fs from "fs";
import "reflect-metadata";
import { ImageBMP, Pixel, Queue } from "../../../../common/communication/customImage";

export class ImageUtil {
    private static readonly OFFSET_IMAGE_START: number = 54;
    private static readonly WIDTH: number = 640;
    private static readonly HEIGHT: number = 480;
    private static readonly NB_COLOR_CHANNELS: number = 3;
    private static readonly NB_BYTES_PIXELS: number = ImageUtil.HEIGHT * ImageUtil.WIDTH * ImageUtil.NB_COLOR_CHANNELS;
    private static readonly WHITE_HEX: number = 255;
    private static readonly ROW_SHIFT_BOLD: number = 3;
    public static readonly NB_DIFF_MAX: number = 7;
    public static readonly EXPECTED_SIZE_IMAGE: number = ImageUtil.OFFSET_IMAGE_START + ImageUtil.NB_BYTES_PIXELS;

    public static generateImageFromBuffer(buffer: Buffer): ImageBMP {
        const array: Uint8Array = new Uint8Array(buffer.length);
        buffer.copy(array, 0, 0, buffer.length);

        return ImageUtil.initializeImageProperties(array);
    }

    public static writeImageToDisk(path: string, fileName: string, image: ImageBMP): void {
        const headers: Uint8Array = image.header;
        const output: Pixel[][] = image.pixels;
        let cpt: number = 0;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        fs.writeFileSync(path + fileName, headers);
        const data: DataView = new DataView(new ArrayBuffer(this.NB_BYTES_PIXELS));
        for (let row: number = 0; row < ImageUtil.HEIGHT; ++row) {
            for (let column: number = 0; column < ImageUtil.WIDTH; ++column) {
                data.setUint8(cpt++, output[row][column].r);
                data.setUint8(cpt++, output[row][column].g);
                data.setUint8(cpt++, output[row][column].b);
            }
        }

        fs.appendFileSync(path + fileName, Buffer.from(data.buffer, 0, data.byteLength));
    }

    public static readFile(file: string): ImageBMP {
        return ImageUtil.generateImageFromBuffer(fs.readFileSync(file));
    }

    public static initializeImageProperties(binary: Uint8Array): ImageBMP {
        return { pixels: ImageUtil.initializePixels(binary), header: ImageUtil.initializeHeader(binary) };
    }

    private static initializeHeader(rawFile: Uint8Array): Uint8Array {
        return rawFile.slice(0, ImageUtil.OFFSET_IMAGE_START);
    }

    private static initializePixels(binary: Uint8Array): Pixel[][] {
        const pixels: Pixel[][] = ImageUtil.initializePixelArray(ImageUtil.HEIGHT, ImageUtil.WIDTH);
        let row: number = 0;
        let col: number = 0;
        for (let i: number = ImageUtil.OFFSET_IMAGE_START; i < binary.byteLength;) {
            col %= ImageUtil.WIDTH;
            pixels[row][col].r = (binary[i++] as number);
            pixels[row][col].g = (binary[i++] as number);
            pixels[row][col].b = (binary[i++] as number);
            ++col;
            if (row === ImageUtil.HEIGHT) { break; }
            if (col === ImageUtil.WIDTH) { ++row; }
        }

        return pixels;
    }

    private static generateAdjacentPixels(row: number, col: number, image: Pixel[][]): number[][] {
        const increments: number[] = [0, 1, -1];
        const adjacentPixels: number[][] = new Array<number[]>();
        increments.forEach((x: number) => {
            increments.forEach((y: number) => {
                if (x !== 0 || y !== 0) {
                    if (ImageUtil.isPixelInImageBounds(row + x, col + y)) {
                        adjacentPixels.push([row + x, col + y]);
                    }
                }
            });
        });

        return adjacentPixels;
    }

    public static isPixelBlack(pixel: Pixel): boolean {
        return pixel.b === 0 && pixel.r === 0 && pixel.g === 0;
    }

    private static isPixelWhite(pixel: Pixel): boolean {
        return pixel.b === ImageUtil.WHITE_HEX && pixel.r === ImageUtil.WHITE_HEX && pixel.g === ImageUtil.WHITE_HEX;
    }

    private static isPixelExplorable(pixel: Pixel): boolean {
        return !pixel.isVisited && !ImageUtil.isPixelWhite(pixel);
    }

    private static isPixelInImageBounds(row: number, col: number): boolean {
        return row < ImageUtil.HEIGHT && row >= 0 && col < ImageUtil.WIDTH && col >= 0;
    }

    public static breadthFirstSearch(image: Pixel[][], row: number, col: number): void {
        const queue: Queue<number[]> = new Queue<number[]>();
        image[row][col].isVisited = true;
        queue.enqueue([row, col]);
        let currentPixel: number[];
        let adjacentPixels: number[][];
        while (!queue.isEmpty()) {
            currentPixel = queue.dequeue() as number[];
            adjacentPixels = ImageUtil.generateAdjacentPixels(currentPixel[0], currentPixel[1], image);
            for (const pixel of adjacentPixels) {
                row = pixel[0];
                col = pixel[1];
                const cur: Pixel = image[row][col];
                if (ImageUtil.isPixelExplorable(cur)) {
                    cur.isVisited = true;
                    queue.enqueue([row, col]);
                }
            }
        }
    }

    public static imageHasSevenDiff(image: Pixel[][]): boolean {
        let cptDiff: number = 0;
        for (let row: number = 0; row < ImageUtil.HEIGHT; ++row) {
            for (let col: number = 0; col < ImageUtil.WIDTH; ++col) {
                if (ImageUtil.isPixelExplorable(image[row][col])) {
                    ImageUtil.breadthFirstSearch(image, row, col);
                    if (++cptDiff > ImageUtil.NB_DIFF_MAX) {
                        return false;
                    }
                }
            }
        }

        return (cptDiff === ImageUtil.NB_DIFF_MAX);
    }

    public static toGrayScale(image: Pixel[][]): void {
        for (const row of image) {
            for (const pixel of row) {
                if (ImageUtil.isPixelBlack(pixel)) {
                    pixel.r = ImageUtil.WHITE_HEX;
                    pixel.g = ImageUtil.WHITE_HEX;
                    pixel.b = ImageUtil.WHITE_HEX;
                } else {
                    pixel.r = 0;
                    pixel.g = 0;
                    pixel.b = 0;
                }
            }
        }
    }

    public static computeDiffImage(originalImage: ImageBMP, modifiedImage: ImageBMP, outputName: string): ImageBMP {
        const output: ImageBMP = ImageUtil.subtractImages(modifiedImage, originalImage);
        ImageUtil.toGrayScale(output.pixels);
        ImageUtil.makePixelsBold(output.pixels);

        return output;
    }

    public static initializePixelArray(height: number, width: number): Pixel[][] {
        const pixels: Pixel[][] = new Array<Pixel[]>(height);
        for (let i: number = 0; i < pixels.length; ++i) {
            pixels[i] = new Array<Pixel>(width);
            for (let j: number = 0; j < width; ++j) {
                pixels[i][j] = {
                    r: 0,
                    g: 0,
                    b: 0,
                    isVisited: false,
                };
            }
        }

        return pixels;
    }

    public static deepCopyPixels(original: Pixel[][]): Pixel[][] {
        const height: number = original.length;
        const width: number = original[0].length;

        const copy: Pixel[][] = ImageUtil.initializePixelArray(height, width);

        for (let row: number = 0; row <  height; ++row) {
            for (let col: number = 0; col < width; ++col) {
                copy[row][col].r = original[row][col].r;
                copy[row][col].g = original[row][col].g;
                copy[row][col].b = original[row][col].b;
                copy[row][col].isVisited = original[row][col].isVisited;
            }
        }

        return copy;
    }

    public static makePixelsBold(output: Pixel[][]): void {
        const copy: Pixel[][] = ImageUtil.deepCopyPixels(output);

        for (let row: number = 0; row < copy.length; ++row) {
            for (let col: number = 0; col < copy[0].length; ++col) {
                if (ImageUtil.isPixelBlack(copy[row][col])) {
                    ImageUtil.makePixelBold(output, row, col);
                }
            }
        }
    }

    public static makePixelBold(output: Pixel[][], row: number, col: number): void {
        let colShift: number = 1;

        for (let r: number = row - ImageUtil.ROW_SHIFT_BOLD; r <= row + ImageUtil.ROW_SHIFT_BOLD; ++r) {
            for (let c: number = col - colShift; c <= col + colShift; ++c) {
                if (ImageUtil.isPixelInImageBounds(r, c) && !ImageUtil.isPixelBlack(output[r][c])) {
                    output[r][c].r = 0;
                    output[r][c].g = 0;
                    output[r][c].b = 0;
                }
            }

            if (row - r <= ImageUtil.ROW_SHIFT_BOLD && row - r > 1) {
                colShift++;
            } else if (r - row < ImageUtil.ROW_SHIFT_BOLD && r - row >= 1) {
                colShift--;
            }
        }
    }

    public static subtractImages(originalImage: ImageBMP, modifiedImage: ImageBMP): ImageBMP {
        const output: ImageBMP = {
            header: originalImage.header,
            pixels: ImageUtil.initializePixelArray(ImageUtil.HEIGHT, ImageUtil.WIDTH),
        };

        for (let row: number = 0; row < ImageUtil.HEIGHT; ++row) {
            for (let col: number = 0; col < ImageUtil.WIDTH; ++col) {
                output.pixels[row][col].r = originalImage.pixels[row][col].r - modifiedImage.pixels[row][col].r;
                output.pixels[row][col].g = originalImage.pixels[row][col].g - modifiedImage.pixels[row][col].g;
                output.pixels[row][col].b = originalImage.pixels[row][col].b - modifiedImage.pixels[row][col].b;
                output.pixels[row][col].isVisited = false;
            }
        }

        return output;
    }

    public static checkFormat(image: ImageBMP): boolean {
        const dv: DataView = new DataView(image.header.buffer);
        const FILE_SIZE_OFFSET: number = 2;
        const WIDTH_OFFSET: number = 18;
        const HEIGHT_OFFSET: number = 22;

        return dv.getUint32(FILE_SIZE_OFFSET, true) === ImageUtil.EXPECTED_SIZE_IMAGE &&
               dv.getUint16(WIDTH_OFFSET, true) === ImageUtil.WIDTH &&
               dv.getUint16(HEIGHT_OFFSET, true) === ImageUtil.HEIGHT;
    }
}
