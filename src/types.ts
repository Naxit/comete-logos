import type { SVGAttributes, ComponentType } from "react";

/** Appearance variant for logos. */
export type LogoAppearance = "brand" | "neutral" | "inverse";

/** Display type: icon only or full logo (icon + wordmark). */
export type LogoType = "icon" | "logo";

/** Available product names. */
export type LogoProduct = "comete";

/** Color overrides for logo rendering. */
export interface LogoColors {
  /** Fill color for text/wordmark paths. */
  text: string;
  /** Fill color for the icon when not using gradient. */
  icon: string;
  /** Gradient start color (light yellow). */
  gradientLight: string;
  /** Gradient stop color (dark yellow/gold). */
  gradientDark: string;
}

/** Props accepted by all logo components. */
export interface LogoProps extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
  /** Visual appearance. @default "brand" */
  appearance?: LogoAppearance;
  /** Display type: icon only or full logo. @default "logo" */
  type?: LogoType;
  /** Rendered height in pixels. Width scales proportionally. @default 32 */
  size?: number;
  /**
   * Color overrides. When provided, these colors are used instead of
   * the default hardcoded values. Designed to receive CSS custom
   * properties from a design token system.
   */
  colors?: LogoColors;
  /** Additional CSS class name. */
  className?: string;
}

/** Registry mapping product names to their logo components. */
export type LogoRegistry = Record<LogoProduct, ComponentType<LogoProps>>;
