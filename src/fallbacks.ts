import type { LogoAppearance, LogoColors } from "./types";

// ---------------------------------------------------------------------------
// WHY: Hardcoded fallback values for contexts where Comète design-token CSS
// custom properties are not loaded (e.g. static exports, emails, server-side
// rendering). Each logo component can import this map instead of duplicating
// the same hex values. The values mirror the *light-theme* token values so
// that an un-themed render produces the same result as the default light UI.
// ---------------------------------------------------------------------------

export const FALLBACK_COLORS: Record<LogoAppearance, LogoColors> = {
	brand: {
		text: "#1E3661",
		icon: "#1E3661",
		gradientLight: "#FFF146",
		gradientDark: "#F8BF01",
	},
	neutral: {
		text: "#224986",
		icon: "#224986",
		gradientLight: "#FFF146",
		gradientDark: "#F8BF01",
	},
	inverse: {
		text: "#F0F8FE",
		icon: "#F0F8FE",
		gradientLight: "#FFF146",
		gradientDark: "#F8BF01",
	},
};

/**
 * Resolve the final colour set for a logo.
 *
 * WHY: If the consumer explicitly passes a `colors` prop, we use those values
 * as inline overrides (= "fallback mode"). Otherwise we return `undefined` so
 * the component knows to rely on CSS custom properties from design tokens.
 */
export function resolveFallback(
	_appearance: LogoAppearance,
	overrides?: LogoColors,
): LogoColors | undefined {
	if (overrides) return overrides;
	return undefined;
}

/**
 * Return hardcoded fallback colours for a given appearance.
 * Used only in fallback mode (no CSS tokens available).
 */
export function getFallback(appearance: LogoAppearance): LogoColors {
	return FALLBACK_COLORS[appearance] ?? FALLBACK_COLORS.brand;
}
