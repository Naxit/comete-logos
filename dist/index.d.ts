import * as react_jsx_runtime from 'react/jsx-runtime';
import { SVGAttributes, ComponentType } from 'react';

/** Appearance variant for logos. */
type LogoAppearance = "brand" | "neutral" | "inverse";
/** Display type: icon only or full logo (icon + wordmark). */
type LogoType = "icon" | "logo";
/** Available product names. */
type LogoProduct = "comete";
/** Props accepted by all logo components. */
interface LogoProps extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
    /** Visual appearance. @default "brand" */
    appearance?: LogoAppearance;
    /** Display type: icon only or full logo. @default "logo" */
    type?: LogoType;
    /** Rendered height in pixels. Width scales proportionally. @default 32 */
    size?: number;
    /** Additional CSS class name. */
    className?: string;
}
/** Registry mapping product names to their logo components. */
type LogoRegistry = Record<LogoProduct, ComponentType<LogoProps>>;

/**
 * Comète product logo.
 *
 * Renders the Comète icon (drop shape) or the full logo (icon + wordmark)
 * in brand, neutral, or inverse appearance.
 */
declare function Comete({ appearance, type, size, className, ...svgProps }: LogoProps): react_jsx_runtime.JSX.Element;
declare namespace Comete {
    var displayName: string;
}

declare const logoRegistry: LogoRegistry;

export { Comete, type LogoAppearance, type LogoProduct, type LogoProps, type LogoRegistry, type LogoType, logoRegistry };
