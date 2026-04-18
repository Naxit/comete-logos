// ---------------------------------------------------------------------------
// LogoFrame — internal composition helper
// ---------------------------------------------------------------------------
//
// Composes `ProductIcon`, `ProductRootName`, `ProductSuffix`, and the Comete
// tagline into the full logo shape for a given product. All top-level logo
// components (`Comete`, `OnTime`, `Link`, `Bi`, `Mce`, `Academie`, `Club`)
// are thin wrappers around this helper.
//
// Layout rules:
//   format="icon"                → just `ProductIcon` (square).
//   suffix="none"                → 144×32 wordmark + icon overlay.
//   suffix="right" (non-comete)  → wordmark + icon overlay + suffix inline.
//   suffix="bottom" (non-comete) → wordmark + icon overlay, suffix scaled 0.6
//                                   on a second row, right-aligned.
//   suffix="bottom" (comete)     → wordmark + icon + "gestion pour la
//                                   sécurité privée" tagline below.
//
// Fallback colors (`colors` prop) are applied as CSS custom-property
// overrides on the wrapper — `ProductIcon`, `ProductRootName`, and
// `ProductSuffix` already consume the same custom properties, so the
// override cascades into each of them without touching their code.
//
// MyComete has a unique artwork (cloud + comet + "my" + "comète") and is
// kept as its own bespoke component outside of this composition path.
//
// Design notes:
// - The icon is positioned absolutely over the wordmark using the
//   product-specific `iconX` value (in wordmark-coordinate units). At
//   `size=32` the wordmark viewBox is 144 units → 1 unit = 1 pixel, so
//   the pixel offset is `iconX * size / 32`.
// - The icon's own viewBox is offset to `${iconX} 0 32 32` so its path
//   coordinates render at the same absolute position they had in the
//   legacy single-SVG version — hence the overlay matches pixel-for-pixel.

import type { CSSProperties, ReactElement } from "react";
import { TAGLINE_PATHS } from "../tagline-paths";
import type {
	LogoAppearance,
	LogoColors,
	LogoFormat,
	LogoProduct,
	LogoSuffix,
} from "../types";
import { ProductIcon, getProductIconX } from "./ProductIcon";
import { ProductRootName } from "./ProductRootName";
import { ProductSuffix, type ProductSuffixProduct } from "./ProductSuffix";

// ---------------------------------------------------------------------------
// Public types

type FrameProduct = Exclude<LogoProduct, "mycomete">;

export interface LogoFrameProps {
	/** Target product. */
	product: FrameProduct;
	/** Visual appearance. @default "brand" */
	appearance?: LogoAppearance;
	/** Display format. @default "logo" */
	format?: LogoFormat;
	/** Suffix display mode. @default "right" */
	suffix?: LogoSuffix;
	/** Rendered row height in pixels. @default 32 */
	size?: number;
	/** Optional explicit colour overrides (bypasses CSS tokens). */
	colors?: LogoColors;
	/** Additional CSS class on the wrapper. */
	className?: string;
}

// ---------------------------------------------------------------------------
// Suffix mapping (products that have a ProductSuffix; comete handled inline).

const SUFFIX_PRODUCT_MAP: Record<
	Exclude<FrameProduct, "comete">,
	ProductSuffixProduct
> = {
	ontime: "ontime",
	link: "link",
	bi: "bi",
	mce: "mce",
	academie: "academie",
	club: "club",
};

// Scale applied to the suffix on `suffix="bottom"` (matches legacy column layout).
const COLUMN_SCALE = 0.6;

// Tagline viewBox for comete bottom suffix (= BOTTOM_VIEWBOX - wordmark row).
const COMETE_TAGLINE_VIEWBOX = "0 0 141 7";
// Default subtle colour used for the tagline paths when no CSS tokens exist.
const FALLBACK_SUBTLE = "#6F8488";

// ---------------------------------------------------------------------------
// Helpers

/**
 * Build inline style that overrides the `--_logo-*` CSS custom properties
 * when the caller provided explicit `colors`. Each child component already
 * reads these variables, so the override cascades through the wrapper.
 */
function fallbackVars(colors?: LogoColors): CSSProperties | undefined {
	if (!colors) return undefined;
	// Cast: React's CSSProperties doesn't model custom properties.
	const vars = {
		"--_logo-text": colors.text,
		"--_logo-icon": colors.icon,
		"--_logo-gradient-light": colors.gradientLight,
		"--_logo-gradient-dark": colors.gradientDark,
		"--_logo-subtle": FALLBACK_SUBTLE,
	} as Record<string, string>;
	return vars as CSSProperties;
}

/** Compose the wrapper class list (appearance class only when no fallback). */
function wrapperClass(
	appearance: LogoAppearance,
	fallback: boolean,
	className?: string,
): string | undefined {
	const parts: string[] = [];
	if (!fallback) parts.push(`comete-logo--${appearance}`);
	if (className) parts.push(className);
	return parts.length > 0 ? parts.join(" ") : undefined;
}

// ---------------------------------------------------------------------------
// Comete tagline (inline-rendered because it's bespoke to this one product).

function CometeTagline({
	size,
	fallback,
}: {
	/** Height of the wordmark row in pixels (the tagline width matches). */
	size: number;
	/** When true, paints with the fallback hex rather than `--_logo-subtle`. */
	fallback: boolean;
}): ReactElement {
	// Width: the tagline is natively ~141u wide, the wordmark is 144u, so we
	// keep wordmark width (144) to align both rows.
	const width = size * (144 / 32);
	const height = size * (7 / 32);
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={COMETE_TAGLINE_VIEWBOX}
			width={width}
			height={height}
			fill="none"
			aria-hidden="true"
			style={{ display: "block" }}
		>
			<g transform="translate(1.5, 0)">
				{TAGLINE_PATHS.map((d) => (
					<path
						key={d}
						d={d}
						style={{ fill: fallback ? FALLBACK_SUBTLE : "var(--_logo-subtle)" }}
					/>
				))}
			</g>
		</svg>
	);
}

// ---------------------------------------------------------------------------
// Component

/**
 * LogoFrame — composes the three public logo parts into the full logo shape.
 *
 * Not meant to be consumed directly by application code: use one of the
 * product-specific wrappers (`Comete`, `OnTime`, etc.) or the generic
 * `Logo` component instead.
 */
export function LogoFrame({
	product,
	appearance = "brand",
	format = "logo",
	suffix = "right",
	size = 32,
	colors,
	className,
}: LogoFrameProps): ReactElement {
	const hasFallback = colors !== undefined;
	const cls = wrapperClass(appearance, hasFallback, className);
	const vars = fallbackVars(colors);

	// ---------- Icon-only format -------------------------------------------
	if (format === "icon") {
		return (
			<span className={cls} style={{ display: "inline-flex", ...vars }}>
				<ProductIcon product={product} appearance={appearance} size={size} />
			</span>
		);
	}

	// ---------- Full logo: wordmark + icon overlay (+ optional suffix) ------
	const iconX = getProductIconX(product);
	const iconLeftPx = (iconX * size) / 32;

	// Wordmark row: position:relative so the icon can overlay at iconX.
	const wordmarkRow = (
		<span
			style={{
				position: "relative",
				display: "inline-block",
				width: (144 * size) / 32,
				height: size,
				lineHeight: 0,
			}}
		>
			<ProductRootName appearance={appearance} size={size} />
			<span
				style={{
					position: "absolute",
					left: iconLeftPx,
					top: 0,
				}}
			>
				<ProductIcon product={product} appearance={appearance} size={size} />
			</span>
		</span>
	);

	// Comete — suffix is the tagline (or nothing).
	if (product === "comete") {
		if (suffix !== "bottom") {
			return (
				<span
					className={cls}
					style={{ display: "inline-flex", lineHeight: 0, ...vars }}
				>
					{wordmarkRow}
				</span>
			);
		}
		// suffix="bottom" → wordmark above, tagline below at y≈35 (3u gap).
		return (
			<span
				className={cls}
				style={{
					display: "inline-flex",
					flexDirection: "column",
					alignItems: "flex-start",
					lineHeight: 0,
					...vars,
				}}
			>
				{wordmarkRow}
				<span style={{ marginTop: (3 * size) / 32 }}>
					<CometeTagline size={size} fallback={hasFallback} />
				</span>
			</span>
		);
	}

	// Non-comete products — map to a ProductSuffix (when suffix !== "none").
	const suffixProduct = SUFFIX_PRODUCT_MAP[product];

	if (suffix === "none") {
		return (
			<span
				className={cls}
				style={{ display: "inline-flex", lineHeight: 0, ...vars }}
			>
				{wordmarkRow}
			</span>
		);
	}

	if (suffix === "right") {
		// Row layout — wordmark + suffix side by side. The suffix viewBox
		// starts at x=144, so the natural whitespace between wordmark and
		// suffix is baked in and requires no gap management here.
		return (
			<span
				className={cls}
				style={{
					display: "inline-flex",
					alignItems: "center",
					lineHeight: 0,
					...vars,
				}}
			>
				{wordmarkRow}
				<ProductSuffix
					product={suffixProduct}
					appearance={appearance}
					size={size}
				/>
			</span>
		);
	}

	// suffix === "bottom" → wordmark row + suffix scaled 0.6 on row 2,
	// right-aligned to the wordmark's right edge.
	const suffixSize = size * COLUMN_SCALE;
	return (
		<span
			className={cls}
			style={{
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "flex-end",
				lineHeight: 0,
				...vars,
			}}
		>
			{wordmarkRow}
			<span style={{ marginTop: (3 * size) / 32 }}>
				<ProductSuffix
					product={suffixProduct}
					appearance={appearance}
					size={suffixSize}
				/>
			</span>
		</span>
	);
}

LogoFrame.displayName = "LogoFrame";
