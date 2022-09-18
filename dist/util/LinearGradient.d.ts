import { ColorFormats } from '@ctrl/tinycolor';
import { Gradient } from './Gradient';
export declare class LinearGradient extends Gradient {
    private _type;
    private _angle;
    constructor(params?: Partial<Pick<LinearGradient, 'angle' | 'stops' | 'limit'>>);
    get angle(): number;
    set angle(value: number);
    get type(): "linear";
    static _angleValidator(value: number): "must be a number" | "must be between 0 and 360" | null;
    toString(colorFormat?: ColorFormats): string;
    toRaw(colorFormat?: ColorFormats): {
        type: "linear";
        angle: number;
        stops: import("./Gradient").GradientStop[];
        limit: number | undefined;
    };
}
