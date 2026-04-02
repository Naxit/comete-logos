import type { SVGAttributes, ComponentType } from "react";

/** Appearance variant for logos. */
export type LogoAppearance = "brand" | "neutral" | "inverse";

/** Display type: icon only or full logo (icon + wordmark). */
export type LogoType = "icon" | "logo";

/** Available product names. */
export type LogoProduct = "comete";

/** Props accepted by all logo components. */
export interface LogoProps extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
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
export type LogoRegistry = Record<LogoProduct, ComponentType<LogoProps>>;
