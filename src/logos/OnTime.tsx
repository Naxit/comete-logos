import { useId } from "react";
import type { ReactElement } from "react";
import type { LogoProps } from "../types";
import { LETTER_C, LETTER_M, LETTER_E_ACCENT, LETTER_T, LETTER_E } from "../wordmark-paths";

// ---------------------------------------------------------------------------
// Viewbox — both variants share the same dimensions.
// ---------------------------------------------------------------------------
const VIEWBOX = "0 0 286 32";

// ---------------------------------------------------------------------------
// Gradient IDs — generated per-instance via useId() to avoid collisions when
// multiple instances of this component coexist in the same document (e.g. a
// story rendering brand + neutral + inverse simultaneously).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Shared gradient transform — same for both bodies since the icon geometry
// is identical; only the SVG structure around it differs.
// ---------------------------------------------------------------------------
const GRAD_TRANSFORM = "translate(26.8825 10.3942) scale(44.2455 45.1256)";

// ═══════════════════════════════════════════════════════════════════════════
// LightBody — Multi-path variant
// ═══════════════════════════════════════════════════════════════════════════
//
// WHY this structure:
// The comet icon is split into TWO separate <path> elements:
//   1. Outer comet silhouette → filled with --_logo-text (solid colour)
//   2. Inner circle + clock cutout → filled with the radial gradient
//
// Because the icon and the circle are separate paths, the clock cutout is
// created by the evenodd fill-rule on the inner compound path alone.
// This variant is used when the background is light enough that the
// gradient-on-solid contrast reads correctly.
//
// Visible in: brand appearance (all themes) — see logos.css switching rules.
// ═══════════════════════════════════════════════════════════════════════════

function LightBody({ lightGradId }: { lightGradId: string }) {
  return (
    <>
      {/* ── "Comète" wordmark ── */}
      <path d={LETTER_C} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_M} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E_ACCENT} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_T} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E} style={{ fill: "var(--_logo-text)" }} />

      {/* ── Comet icon — outer silhouette (solid text colour) ── */}
      <path fillRule="evenodd" clipRule="evenodd" d="M27.7324 25.3026L16.8 0L41.9301 10.3893C46.0247 12.0741 48.727 16.1092 48.7987 20.6123C48.8908 26.8001 44.0388 31.9064 37.9687 32H37.7947C33.4442 32 29.493 29.3793 27.7324 25.3026Z" style={{ fill: "var(--_logo-text)" }} />

      {/* ── Comet icon — inner circle + clock cutout (gradient fill) ──
           WHY evenodd: the path combines the circle outline AND the clock
           hands/dial. evenodd makes the clock area transparent, revealing
           the solid-coloured outer silhouette behind it. ── */}
      <path fillRule="evenodd" clipRule="evenodd" d="M37.7996 30.2252C36.4968 30.2252 35.2785 29.9785 34.1446 29.4851C33.0108 28.9919 32.0198 28.3211 31.1717 27.4728C30.3233 26.6247 29.6526 25.6337 29.1593 24.4998C28.6659 23.366 28.4192 22.1477 28.4192 20.8449C28.4192 19.542 28.6659 18.3237 29.1593 17.1899C29.6526 16.056 30.3233 15.065 31.1717 14.2169C32.0198 13.3686 33.0108 12.6978 34.1446 12.2046C35.2785 11.7112 36.4927 11.4645 37.7873 11.4645C39.0338 11.4645 40.2621 11.7212 41.4093 12.2046C42.8627 12.817 44.1066 13.7254 45.1141 14.9542C45.8031 15.7945 46.2727 16.7113 46.6356 17.7128C46.9985 18.7143 47.18 19.7596 47.18 20.8488C47.18 22.149 46.9333 23.366 46.4399 24.4998C45.9467 25.6337 45.2759 26.6247 44.4276 27.4728C43.5794 28.3211 42.5884 28.9919 41.4546 29.4851C40.3208 29.9785 39.1024 30.2252 37.7996 30.2252ZM39.8107 24.195L41.1045 22.9011L38.6092 20.4059V16.1547H36.7609V21.1452L39.8107 24.195Z" fill={`url(#${lightGradId})`} />

      {/* ── "on time" wordmark — uses --_logo-subtle for lighter weight ──
           WHY subtle: in brand mode, "on time" is visually secondary to
           "Comète", so it uses the subtle token which is lighter than the
           default text colour. In neutral/inverse the CSS maps subtle to
           the same value as text, so there's no visible difference. ── */}
      <path d="M156.2 21.1596C156.219 18.1849 157.225 15.6798 159.198 13.6445C161.114 11.5896 163.628 10.5328 166.762 10.4741C169.916 10.5328 172.45 11.5896 174.384 13.6445C176.338 15.6798 177.325 18.1849 177.344 21.1791C177.325 24.1539 176.357 26.6393 174.462 28.6551C172.604 30.71 170.032 31.7668 166.782 31.8255C163.551 31.7668 161.017 30.71 159.16 28.6551C157.187 26.6197 156.219 24.1147 156.2 21.1596ZM166.762 13.7424C164.847 13.7619 163.222 14.4665 161.887 15.8168C160.514 17.2063 159.817 18.9872 159.779 21.1596C159.817 23.1558 160.514 24.878 161.887 26.287C163.222 27.7548 164.847 28.4985 166.762 28.5181C168.716 28.4985 170.36 27.7548 171.695 26.287C173.03 24.878 173.726 23.1558 173.746 21.1596C173.726 18.9872 173.03 17.2063 171.695 15.8168C170.36 14.4665 168.716 13.7619 166.762 13.7424Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M193.965 19.4765C193.965 17.8717 193.636 16.5409 192.959 15.4254C192.63 14.897 192.185 14.486 191.605 14.1533C191.005 13.8793 190.27 13.7227 189.419 13.7227C186.092 13.7814 184.409 15.8168 184.37 19.8287V31.3166H181.004V10.9437H184.37V13.3313H184.448C184.989 12.3919 185.744 11.6678 186.692 11.1786C187.659 10.7089 188.684 10.474 189.806 10.474C191.779 10.474 193.501 11.0611 195.01 12.2158C196.519 13.4292 197.293 15.4254 197.331 18.1652V31.3557H193.965V19.4765Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M210.107 6.01192H213.473V10.9437H216.588V14.0358H213.473V26.5609C213.473 27.0893 213.589 27.4612 213.841 27.7156C214.073 27.9504 214.498 28.0679 215.117 28.0679H216.665V31.3166C216.143 31.3361 215.446 31.3557 214.595 31.3557C212.912 31.3557 211.732 31.023 211.094 30.338C210.417 29.6335 210.088 28.4984 210.107 26.9719V14.0554H207.399V10.9633H210.107V6.01192Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M220.302 4.46588C220.302 3.74177 220.534 3.15465 221.018 2.70453C221.463 2.25441 222.004 2.01957 222.662 2C223.358 2.01957 223.919 2.25441 224.345 2.70453C224.771 3.15465 225.003 3.74177 225.022 4.46588C225.003 5.15085 224.771 5.71839 224.345 6.18809C223.919 6.67735 223.358 6.93176 222.662 6.93176C222.004 6.93176 221.463 6.67735 221.018 6.18809C220.534 5.71839 220.302 5.15085 220.302 4.46588ZM220.96 10.9437H224.326V31.3362H220.96V10.9437Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M255.684 18.8306C255.664 17.0496 255.219 15.7384 254.388 14.936C253.517 14.1336 252.453 13.7227 251.215 13.7227C249.726 13.7227 248.507 14.1532 247.578 15.0143C246.592 15.9341 246.089 17.2453 246.089 18.9676V31.3165H242.723V18.8306C242.684 17.0496 242.258 15.758 241.427 14.9556C240.556 14.1532 239.492 13.7422 238.254 13.7422C236.764 13.7422 235.546 14.1728 234.617 15.0339C233.631 15.9537 233.128 17.2649 233.128 18.9871V31.3361H229.762V10.9436H233.128V13.3704H233.205C233.727 12.3332 234.501 11.5699 235.565 11.1002C236.629 10.6892 237.693 10.474 238.776 10.474C239.84 10.4544 240.885 10.6501 241.949 11.1002C242.974 11.5699 243.903 12.5289 244.735 13.9966C245.412 12.7246 246.34 11.8048 247.54 11.2568C248.72 10.7284 249.977 10.474 251.312 10.474C253.536 10.474 255.355 11.1394 256.806 12.4506C258.276 13.7814 259.03 15.7776 259.05 18.4783V31.3557H255.684V18.8306Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M283.598 27.3829C281.045 30.3576 278.124 31.845 274.796 31.8058C271.353 31.7471 268.703 30.6316 266.884 28.4788C265.046 26.3652 264.137 23.9189 264.137 21.1203C264.157 18.1456 265.085 15.621 266.923 13.5857C268.722 11.5504 271.14 10.5131 274.216 10.4544C277.292 10.4936 279.748 11.5895 281.586 13.7618C283.463 15.9146 284.411 18.8306 284.449 22.4903H267.735C268.026 24.232 268.799 25.6411 270.057 26.7371C271.275 27.8917 272.842 28.4789 274.758 28.518C277.176 28.4984 279.265 27.4025 281.025 25.2301L283.598 27.3829ZM280.638 19.5938C280.464 17.8521 279.787 16.443 278.626 15.3275C277.466 14.2902 275.996 13.7618 274.197 13.7423C272.146 13.7618 270.598 14.3881 269.573 15.5819C268.528 16.7757 267.909 18.1261 267.735 19.5938H280.638Z" style={{ fill: "var(--_logo-subtle)" }} />

      {/* ── Gradient definition for the inner circle ── */}
      <defs>
        <radialGradient id={lightGradId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={GRAD_TRANSFORM}>
          <stop style={{ stopColor: "var(--_logo-gradient-light)" }} />
          <stop offset="0.7358" style={{ stopColor: "var(--_logo-gradient-dark)" }} />
        </radialGradient>
      </defs>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DarkBody — Single evenodd compound path variant
// ═══════════════════════════════════════════════════════════════════════════
//
// WHY this structure:
// The comet icon is a SINGLE compound <path> that merges the outer
// silhouette, the inner circle, AND the clock hands. The evenodd fill-rule
// makes overlapping regions alternate between filled and transparent:
//   • Inside comet, outside circle → 1 crossing (odd)  → FILLED
//   • Inside circle, outside clock → 2 crossings (even) → TRANSPARENT
//   • Inside clock hands           → 3 crossings (odd)  → FILLED
//
// This creates the clock cutout without needing a second path on top.
//
// WHY gradient here too:
// The comet compound path uses the same radial gradient as LightBody.
// For brand/inverse appearances, this produces the yellow gradient with
// the clock cutout visible. For neutral, the CSS maps both gradient stops
// to the same solid colour (--logo-comete-neutral), so the gradient
// renders as a flat fill — no visual gradient, correct solid cutout.
//
// Visible in: neutral and inverse appearances (all themes) — see logos.css.
// ═══════════════════════════════════════════════════════════════════════════

function DarkBody({ darkGradId }: { darkGradId: string }) {
  return (
    <>
      {/* ── "Comète" wordmark ── */}
      <path d={LETTER_C} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_M} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E_ACCENT} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_T} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E} style={{ fill: "var(--_logo-text)" }} />

      {/* ── Comet icon — single compound path with clock cutout ──
           WHY gradient (not solid): using the gradient here means the CSS
           controls what the "gradient" actually looks like per appearance:
           • brand/inverse → real yellow gradient → clock cutout visible
           • neutral → both stops are the same solid colour → flat fill,
             but evenodd still carves out the clock shape correctly ── */}
      <path fillRule="evenodd" clipRule="evenodd" d="M16.8 0L27.7324 25.3026C29.493 29.3793 33.4442 32 37.7947 32H37.9687C44.0388 31.9064 48.8908 26.8001 48.7987 20.6123C48.727 16.1092 46.0247 12.0741 41.9301 10.3893L16.8 0ZM34.1446 29.4851C35.2785 29.9785 36.4968 30.2252 37.7996 30.2252C39.1024 30.2252 40.3208 29.9785 41.4546 29.4851C42.5884 28.9919 43.5794 28.3211 44.4276 27.4728C45.2759 26.6247 45.9467 25.6337 46.4399 24.4998C46.9333 23.366 47.18 22.149 47.18 20.8488C47.18 19.7596 46.9985 18.7143 46.6356 17.7128C46.2727 16.7113 45.8031 15.7945 45.1141 14.9542C44.1066 13.7254 42.8627 12.817 41.4093 12.2046C40.2621 11.7212 39.0338 11.4645 37.7873 11.4645C36.4927 11.4645 35.2785 11.7112 34.1446 12.2046C33.0108 12.6978 32.0198 13.3686 31.1717 14.2169C30.3233 15.065 29.6526 16.056 29.1593 17.1899C28.6659 18.3237 28.4192 19.542 28.4192 20.8449C28.4192 22.1477 28.6659 23.366 29.1593 24.4998C29.6526 25.6337 30.3233 26.6247 31.1717 27.4728C32.0198 28.3211 33.0108 28.9919 34.1446 29.4851ZM39.8107 24.195L41.1045 22.9011L38.6092 20.4059V16.1547H36.7609V21.1452L39.8107 24.195Z" fill={`url(#${darkGradId})`} />

      {/* ── "on time" wordmark — subtle weight, same as LightBody ──
           WHY --_logo-subtle (not --_logo-icon): keeps visual hierarchy
           consistent between both SVG bodies. "on time" is secondary text
           and must use the subtle token in both variants. ── */}
      <path d="M156.2 21.1596C156.219 18.1849 157.231 15.7598 159.216 13.7125C161.142 11.6456 163.672 10.5826 166.824 10.5236C169.996 10.5826 172.545 11.6456 174.491 13.7125C176.456 15.7598 177.448 18.2795 177.468 21.2913C177.448 24.2834 176.475 26.7834 174.568 28.811C172.7 30.8779 170.112 31.9409 166.844 31.9999C163.594 31.9409 161.045 30.8779 159.177 28.811C157.192 26.7637 156.219 24.244 156.2 21.2716ZM166.824 13.811C164.898 13.8306 163.263 14.5393 161.921 15.8976C160.539 17.2952 159.839 19.0866 159.8 21.2716C159.839 23.2795 160.539 25.0117 161.921 26.4291C163.263 27.9054 164.898 28.6535 166.824 28.6732C168.789 28.6535 170.443 27.9054 171.786 26.4291C173.128 25.0117 173.829 23.2795 173.848 21.2716C173.829 19.0866 173.128 17.2952 171.786 15.8976C170.443 14.5393 168.789 13.8306 166.824 13.811Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M193.965 19.4765C193.965 17.8717 193.855 16.6259 193.174 15.5038C192.844 14.9723 192.396 14.5589 191.812 14.2243C191.209 13.9487 190.47 13.7912 189.614 13.7912C186.267 13.8503 184.574 15.8975 184.535 19.9329V31.4881H181.149V10.9959H184.535V13.3975H184.613C185.158 12.4526 185.917 11.7243 186.87 11.2322C187.843 10.7597 188.874 10.5235 190.003 10.5235C191.987 10.5235 193.719 11.1141 195.237 12.2755C196.755 13.4959 197.533 15.5038 197.572 18.2597V31.5274H194.186V19.5786Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M210.107 6.01192H213.473V10.9437H216.941V14.1061H213.808V26.7046C213.808 27.2361 213.925 27.6101 214.178 27.866C214.412 28.1022 214.84 28.2203 215.462 28.2203H217.019V31.488C216.494 31.5077 215.793 31.5274 214.937 31.5274C213.244 31.5274 212.057 31.1928 211.415 30.5038C210.734 29.7951 210.403 28.6534 210.423 27.118V14.1258H207.698V11.0156H210.423V6.03528Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M220.302 4.46588C220.302 3.74177 220.91 3.16129 221.397 2.70853C221.844 2.25578 222.389 2.01956 223.051 1.99988C223.751 2.01956 224.316 2.25578 224.744 2.70853C225.172 3.16129 225.405 3.75184 225.425 4.48019C225.405 5.16917 225.172 5.74003 224.744 6.21248C224.316 6.7046 223.751 6.96051 223.051 6.96051C222.389 6.96051 221.844 6.7046 221.397 6.21248C220.91 5.74003 220.677 5.16917 220.677 4.48019ZM221.339 10.9959H224.724V31.5078H221.339V10.9959Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M255.684 18.8306C255.664 17.0496 255.799 15.8187 254.962 15.0116C254.087 14.2045 253.016 13.7912 251.771 13.7912C250.273 13.7912 249.047 14.2242 248.113 15.0904C247.121 16.0156 246.615 17.3345 246.615 19.0667V31.488H243.229V18.9289C243.19 17.1376 242.762 15.8384 241.925 15.0313C241.05 14.2242 239.98 13.8108 238.734 13.8108C237.236 13.8108 236.01 14.2439 235.076 15.11C234.084 16.0352 233.578 17.3541 233.578 19.0864V31.5077H230.192V10.9959H233.578V13.4368H233.656C234.181 12.3935 234.959 11.6258 236.03 11.1534C237.1 10.74 238.17 10.5234 239.26 10.5234C240.33 10.5037 241.381 10.7006 242.451 11.1534C243.482 11.6258 244.416 12.5904 245.253 14.0667C245.934 12.7872 246.868 11.862 248.074 11.3108C249.261 10.7793 250.526 10.5234 251.868 10.5234C254.106 10.5234 255.935 11.1927 257.395 12.5116C258.873 13.8502 259.632 15.8581 259.652 18.5746V31.5274H256.266V18.9289Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M283.598 27.3829C281.045 30.3576 278.837 32.0195 275.49 31.9802C272.027 31.9211 269.361 30.7991 267.532 28.6337C265.683 26.5077 264.769 24.0471 264.769 21.2321C264.788 18.24 265.722 15.7006 267.571 13.6534C269.38 11.6061 271.813 10.5628 274.907 10.5038C278 10.5432 280.472 11.6455 282.32 13.8306C284.208 15.9959 285.161 18.929 285.2 22.6101H268.388C268.68 24.3621 269.458 25.7794 270.723 26.8817C271.949 28.0432 273.525 28.6337 275.451 28.6731C277.884 28.6534 279.985 27.551 281.756 25.366L284.344 27.5313ZM281.367 19.6967C281.192 17.9447 280.51 16.5274 279.343 15.4054C278.176 14.3621 276.697 13.8306 274.887 13.8109C272.825 13.8306 271.268 14.4605 270.237 15.6613C269.186 16.8621 268.563 18.2203 268.388 19.6967H281.367Z" style={{ fill: "var(--_logo-subtle)" }} />

      {/* ── Gradient definition for the compound comet path ──
           WHY same gradient structure as LightBody: the CSS custom properties
           handle the differentiation. For neutral, both stops resolve to the
           same solid colour, so the gradient is visually flat. ── */}
      <defs>
        <radialGradient id={darkGradId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={GRAD_TRANSFORM}>
          <stop style={{ stopColor: "var(--_logo-gradient-light)" }} />
          <stop offset="0.7358" style={{ stopColor: "var(--_logo-gradient-dark)" }} />
        </radialGradient>
      </defs>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════════

/**
 * OnTime product logo.
 *
 * WHY two SVG bodies:
 * Figma exports two distinct SVG structures for the comet icon depending
 * on the visual context:
 *   • **LightBody** (multi-path): outer silhouette + inner gradient circle
 *     as separate `<path>` elements. Used when the background is light
 *     enough for the gradient-on-solid contrast to read correctly.
 *   • **DarkBody** (evenodd): a single compound `<path>` where the clock
 *     cutout is achieved via the `evenodd` fill-rule. Used on dark
 *     backgrounds and for the neutral appearance.
 *
 * The CSS in `logos.css` toggles visibility based on appearance only
 * (the theme does NOT affect which body is shown):
 *
 * ┌──────────────┬──────────────┐
 * │ Appearance   │ Body         │
 * ├──────────────┼──────────────┤
 * │ Brand        │ LightBody    │
 * │ Neutral      │ DarkBody     │
 * │ Inverse      │ DarkBody     │
 * └──────────────┴──────────────┘
 *
 * Dark theme token overrides (in CSS) swap default↔inverted so that
 * brand and inverse keep the same visual output regardless of theme.
 */
export function OnTime({
  appearance = "brand",
  size = 32,
  className,
}: LogoProps): ReactElement {
  const rootClass = `comete-logo--${appearance}${className ? ` ${className}` : ""}`;

  const [,, vbW, vbH] = VIEWBOX.split(" ").map(Number);
  const width = size * ((vbW ?? 1) / (vbH ?? 1));

  // Per-instance unique gradient IDs to avoid collisions when multiple
  // instances of this logo coexist in the same document.
  const uid = useId();
  const lightGradId = `${uid}l`;
  const darkGradId = `${uid}d`;

  return (
    <span className={rootClass} style={{ display: "inline-flex" }}>
      {/* WHY two sibling SVGs: CSS display:block/none switches between them.
          Both exist in the DOM so the transition is instant (no re-mount). */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={VIEWBOX}
        width={width}
        height={size}
        fill="none"
        aria-hidden="true"
        className="comete-logo__light"
      >
        <LightBody lightGradId={lightGradId} />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={VIEWBOX}
        width={width}
        height={size}
        fill="none"
        aria-hidden="true"
        className="comete-logo__dark"
      >
        <DarkBody darkGradId={darkGradId} />
      </svg>
    </span>
  );
}

OnTime.displayName = "OnTime";
