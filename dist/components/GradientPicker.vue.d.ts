import { HSL, RGBA, HSV, ColorFormats } from '@ctrl/tinycolor';
import { LinearGradient } from '../util';
import { GradientStop } from '../util/Gradient';
interface VueColor {
    hsl: HSL;
    hex: string;
    hex8: string;
    rgba: RGBA;
    hsv: HSV;
    oldHue: HSL['h'];
    source: ColorFormats;
    a: RGBA['a'];
}
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: typeof LinearGradient;
        default: () => LinearGradient;
    };
}, unknown, {
    currentStopIdx: number;
    containerBoundingClientRectangle: DOMRect | null;
}, {
    angle: {
        get(): number;
        set(val: string): void;
    };
    stops(): GradientStop[];
    previewStyle(): {
        background: string;
    };
    stopsPreviewStyle(): {
        background: string;
    };
    currentColor: {
        get(): import("@ctrl/tinycolor").ColorInput;
        set(val: VueColor): void;
    };
    orderedStops(): GradientStop[];
    limit(): number | undefined;
}, {
    emitInput(angle?: number | undefined, stops?: GradientStop[] | undefined, limit?: number | undefined): void;
    getGradientString(angle: number): string;
    setCurrentStopIdx(index: number): void;
    stopStyle(index: number): {
        left: string;
        color: string;
    };
    addStop(event: MouseEvent): void;
    removeCurrentStop(): void;
    setContainerBoundingClientRectangle(): void;
    handleMouseDown(index: number): void;
    handleMouseUp(): void;
    unbindEventListeners(): void;
    handleTouchstart(index: number): void;
    handleTouchend(): void;
    getClickPosition(event: MouseEvent | TouchEvent): {
        x: number;
        y: number;
    };
    handleChange(event: MouseEvent | TouchEvent): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: typeof LinearGradient;
        default: () => LinearGradient;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: LinearGradient;
}>;
export default _sfc_main;
