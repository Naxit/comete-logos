// ---------------------------------------------------------------------------
// ProductRootName — Comète Design System (logos)
// ---------------------------------------------------------------------------
//
// Renders the "Comète" wordmark — just the 5 text letters (C, m, è, t, e).
// The comet icon (the "o" glyph) is NOT included here — it is a separate
// component (`ProductIcon`) so that each product can swap its own comet
// path while the root name stays identical across all products.
//
// Coordinate system: all letter paths are designed for a 32-height viewBox
// and positioned at x=0..144. The icon (when composed by `Logo`) is
// positioned absolute at the product-specific `iconX`.

import type { ReactElement, SVGAttributes } from "react";
import type { LogoAppearance } from "../types";
import { COMETE_TEXT_PATHS } from "../wordmark-paths";

/** ViewBox of the full "Comète" wordmark (5 letters + icon slot). */
export const ROOT_NAME_VIEWBOX = "0 0 144 32";
/** Natural width of the wordmark viewBox. */
export const ROOT_NAME_NATURAL_WIDTH = 144;
/** Natural height of the wordmark viewBox. */
export const ROOT_NAME_NATURAL_HEIGHT = 32;

export interface ProductRootNameProps
	extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
	/** Appearance (drives CSS custom properties). @default "brand" */
	appearance?: LogoAppearance;
	/** Rendered height in pixels. Width scales proportionally. @default 32 */
	size?: number;
	/** Additional CSS class. */
	className?: string;
}

/**
 * "Comète" wordmark — 5 letter paths rendered as a single SVG.
 *
 * The paths are filled via `var(--_logo-text)`, which resolves through the
 * `.comete-logo--{appearance}` class. The gap between "C" and "m" is left
 * empty so the `ProductIcon` (comet) can be positioned over it by the
 * parent `Logo` wrapper.
 */
export function ProductRootName({
	appearance = "brand",
	size = 32,
	className,
	...rest
}: ProductRootNameProps): ReactElement {
	const rootClass = [`comete-logo--${appearance}`, className]
		.filter(Boolean)
		.join(" ");
	const width = (size * ROOT_NAME_NATURAL_WIDTH) / ROOT_NAME_NATURAL_HEIGHT;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={ROOT_NAME_VIEWBOX}
			width={width}
			height={size}
			fill="none"
			aria-hidden="true"
			className={rootClass}
			{...rest}
		>
			{COMETE_TEXT_PATHS.map((d) => (
				<path key={d} d={d} style={{ fill: "var(--_logo-text)" }} />
			))}
		</svg>
	);
}

ProductRootName.displayName = "ProductRootName";
