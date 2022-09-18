import { ColorInput } from '@ctrl/tinycolor';
export declare class GradientError extends Error {
    constructor(message: string);
}
export declare type GradientStop = [ColorInput, number];
export declare class Gradient {
    private _stops;
    private _limit?;
    constructor(params?: Partial<Pick<Gradient, 'stops' | 'limit'>>);
    get stops(): GradientStop[];
    set stops(value: GradientStop[]);
    get limit(): number | undefined;
    addStop(value: GradientStop): void;
    removeStopByIndex(index: number): void;
    static _stopPointValidator(value: GradientStop): "point must be an array" | "wrong point format" | "position must be a number" | "position must be between 0 and 1" | "color is invalid" | null;
    static _stopArrayValidator(value: GradientStop[]): "must be an array" | "wrong array format" | null;
}
