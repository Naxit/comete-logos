import type { SVGAttributes, ComponentType } from "react";

/** Appearance variant for logos. */
export type LogoAppearance = "brand" | "neutral" | "inverse";

/** Display type: icon only or full logo (icon + wordmark). */
export type LogoType = "icon" | "logo";

/** Layout direction for product logos. */
export type LogoAlign = "row" | "column";

/** Available product names. */
export type LogoProduct = "comete" | "ontime" | "link" | "bi" | "academie" | "club" | "mce" | "mycomete";

/**
 * Color overrides for logo rendering.
 *
 * Use this only when CSS design tokens are not available (e.g. emails,
 * static exports). In normal usage the component resolves colours from
 * the `.comete-logo--{appearance}` CSS classes which map to Comète
 * design-token custom properties.
 */
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
  /** Layout direction for product logos. @default "row" */
  align?: LogoAlign;
  /** Rendered height in pixels. Width scales proportionally. @default 32 */
  size?: number;
  /**
   * Color overrides — **fallback only**.
   *
   * When provided, these colors are used as inline styles instead of
   * the CSS custom-property–based classes. Useful for contexts where
   * `@naxit/comete-design-tokens` CSS is not loaded (static exports,
   * emails, etc.).
   */
  colors?: LogoColors;
  /** Additional CSS class name. */
  className?: string;
}

/** Registry mapping product names to their logo components. */
export type LogoRegistry = Record<LogoProduct, ComponentType<LogoProps>>;
