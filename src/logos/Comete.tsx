import type { CSSProperties } from "react";
import type { LogoColors, LogoProps } from "../types";
import { getFallback } from "../fallbacks";
import { COMETE_TEXT_PATHS } from "../wordmark-paths";

// ---------------------------------------------------------------------------
// SVG path data

const ICON_PATH =
  "M25.1273 10.4066L0 0L10.9672 25.2733C12.7719 29.3793 16.7978 32.0694 21.1708 31.9986C27.2791 31.9278 32.0686 26.8307 31.9992 20.6009C31.9298 16.0701 29.2227 12.0349 25.1273 10.4066ZM21.3096 28.459C18.3943 28.5298 15.8261 26.7599 14.646 24.0698L7.49655 7.5749L23.8779 14.3711C26.585 15.5038 28.3203 18.1231 28.3897 21.0256C28.4591 25.0609 25.3356 28.3882 21.3096 28.459Z";

const ICON_VIEWBOX = "0 0 32 32";

const WORDMARK_BRAND = {
  viewBox: "0 0 144 32",
  iconPath:
    "M41.8836 10.4066L16.2942 0L27.463 25.2733C29.3009 29.3793 33.4009 32.0694 37.8543 31.9986C44.0749 31.9278 48.9524 26.8307 48.8817 20.6009C48.8111 16.0701 46.0542 12.0349 41.8836 10.4066ZM37.9957 28.459C35.0267 28.5298 32.4112 26.7599 31.2095 24.0698L23.9286 7.5749L40.6112 14.3711C43.368 15.5038 45.1352 18.1231 45.2059 21.0256C45.2766 25.0609 42.0956 28.3882 37.9957 28.459Z",
  iconGradientTransform: "translate(26.5621 10.3942) scale(45.059 45.1256)",
  textPaths: [...COMETE_TEXT_PATHS],
};



// ---------------------------------------------------------------------------
// Helpers

/** Whether the `colors` prop was explicitly provided (= fallback mode). */
function useFallback(overrides?: LogoColors): overrides is LogoColors {
  return overrides !== undefined;
}

/**
 * Build the CSS class string for the SVG root.
 *
 * In token mode (no `colors` override), we add the appearance class so that
 * CSS custom properties from `logos.css` drive the fills.
 * In fallback mode, we skip the appearance class — inline styles take over.
 */
function rootClassName(appearance: string, fallback: boolean, className?: string): string {
  const parts: string[] = [];
  if (!fallback) parts.push(`comete-logo--${appearance}`);
  if (className) parts.push(className);
  return parts.join(" ") || undefined!;
}

// --- Token-driven styles (use CSS custom properties) ----------------------

function tokenTextStyle(): CSSProperties {
  return { fill: "var(--_logo-text)" };
}

function tokenIconStyle(): CSSProperties {
  return { fill: "var(--_logo-icon)" };
}

function tokenGradientLightStyle(): CSSProperties {
  return { stopColor: "var(--_logo-gradient-light)" };
}

function tokenGradientDarkStyle(): CSSProperties {
  return { stopColor: "var(--_logo-gradient-dark)" };
}

// --- Fallback styles (hardcoded values) -----------------------------------

function fallbackTextStyle(c: LogoColors): CSSProperties {
  return { fill: c.text };
}

function fallbackIconStyle(c: LogoColors): CSSProperties {
  return { fill: c.icon };
}

// ---------------------------------------------------------------------------
// Gradient

function CometeGradient({
  id,
  transform,
  fallbackColors,
}: {
  id: string;
  transform: string;
  fallbackColors?: LogoColors;
}) {
  return (
    <defs>
      <radialGradient
        id={id}
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform={transform}
      >
        <stop
          style={
            fallbackColors
              ? { stopColor: fallbackColors.gradientLight }
              : tokenGradientLightStyle()
          }
        />
        <stop
          offset="0.7358"
          style={
            fallbackColors
              ? { stopColor: fallbackColors.gradientDark }
              : tokenGradientDarkStyle()
          }
        />
      </radialGradient>
    </defs>
  );
}

// ---------------------------------------------------------------------------
// Component

/**
 * Comète product logo.
 *
 * Renders the Comète icon (drop shape) or the full logo (icon + wordmark)
 * in brand, neutral, or inverse appearance.
 *
 * **Theme-aware by default**: the component applies a
 * `.comete-logo--{appearance}` CSS class that maps to Comète design-token
 * custom properties (`--logo-comete-*`). Light / dark theming is handled
 * automatically via `[data-theme]` on `<html>`.
 *
 * Pass `colors` to bypass tokens and use explicit colour values instead
 * (useful for emails, static exports, or contexts without CSS tokens).
 */
export function Comete({
  appearance = "brand",
  type = "logo",
  size = 32,
  colors: colorOverrides,
  className,
  ...svgProps
}: LogoProps) {
  const gradientId = `comete-grad-${appearance}`;
  const useGradient = appearance !== "neutral";
  const fallback = useFallback(colorOverrides);

  // In fallback mode, resolve hardcoded colours.
  const fb = fallback
    ? colorOverrides
    : undefined;
  const fbResolved = fb ?? getFallback(appearance);

  // --- Icon only -----------------------------------------------------------
  if (type === "icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={ICON_VIEWBOX}
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
        className={rootClassName(appearance, fallback, className)}
        {...svgProps}
      >
        <path
          d={ICON_PATH}
          fill={useGradient ? `url(#${gradientId})` : undefined}
          style={
            useGradient
              ? undefined
              : fallback
                ? fallbackIconStyle(fbResolved)
                : tokenIconStyle()
          }
        />
        {useGradient && (
          <CometeGradient
            id={gradientId}
            transform="translate(10.0825 10.3942) scale(44.2454 45.1256)"
            fallbackColors={fallback ? fbResolved : undefined}
          />
        )}
      </svg>
    );
  }

  // --- Full logo (icon + wordmark) -----------------------------------------
  const data = WORDMARK_BRAND;
  const ts = fallback ? fallbackTextStyle(fbResolved) : tokenTextStyle();

  const [, , vbW, vbH] = data.viewBox.split(" ").map(Number);
  const width = size * ((vbW ?? 1) / (vbH ?? 1));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={data.viewBox}
      width={width}
      height={size}
      fill="none"
      aria-hidden="true"
      className={rootClassName(appearance, fallback, className)}
      {...svgProps}
    >
      {data.textPaths.map((d, i) => (
        <path key={i} d={d} style={ts} />
      ))}
      <path
        d={data.iconPath}
        fill={useGradient ? `url(#${gradientId})` : undefined}
        style={
          useGradient
            ? undefined
            : fallback
              ? fallbackIconStyle(fbResolved)
              : tokenIconStyle()
        }
      />
      {useGradient && (
        <CometeGradient
          id={gradientId}
          transform={data.iconGradientTransform}
          fallbackColors={fallback ? fbResolved : undefined}
        />
      )}
    </svg>
  );
}

Comete.displayName = "Comete";
