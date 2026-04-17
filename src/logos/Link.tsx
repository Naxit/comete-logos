import { useId } from "react";
import type { ReactElement } from "react";
import type { LogoSuffix, LogoProps } from "../types";
import { LETTER_C, LETTER_M, LETTER_E_ACCENT, LETTER_T, LETTER_E } from "../wordmark-paths";
import { COLUMN_VIEWBOX, WORDMARK_VIEWBOX, PRODUCT_LAYOUTS } from "../layout-data";

const GRAD_TRANSFORM = "translate(26.0825 10.3942) scale(44.2454 45.1256)";

const VIEWBOX = "0 0 217 32";

function LightBody({ lightGradId, suffix }: { lightGradId: string; suffix: LogoSuffix }) {
  const productPaths = (
    <>
      <path d="M169.192 7.44538C168.506 7.44538 167.927 7.21183 167.461 6.74474C166.993 6.27765 166.761 5.71358 166.761 5.0545C166.761 4.39543 166.995 3.82542 167.461 3.34448C167.927 2.86353 168.506 2.62207 169.192 2.62207C169.878 2.62207 170.413 2.86353 170.881 3.34448C171.348 3.82542 171.582 4.39543 171.582 5.0545C171.582 5.71358 171.348 6.27765 170.881 6.74474C170.413 7.21183 169.851 7.44538 169.192 7.44538ZM167.379 31.8093V11.196H170.964V31.8093H167.379Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M186.709 10.6597C189.126 10.6597 191.063 11.4217 192.521 12.9477C193.976 14.4736 194.706 16.5419 194.706 19.1525V31.8094H191.12V19.3583C191.12 17.6819 190.666 16.3836 189.759 15.4632C188.853 14.5429 187.602 14.0818 186.009 14.0818C184.223 14.0818 182.779 14.6379 181.681 15.7522C180.582 16.8645 180.033 18.5765 180.033 20.8843V31.8094H176.448V11.1961H180.033V14.1649C181.489 11.8294 183.715 10.6617 186.711 10.6617L186.709 10.6597Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M217.128 31.8095H212.677L203.28 22.05V31.8095H199.694V2.95076H203.28V20.2707L212.183 11.1961H216.8L206.948 21.1732L217.128 31.8095Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M162.87 28.6564C162.505 28.6604 162.164 28.6604 161.852 28.6564C161.027 28.6425 160.416 28.4229 160.017 27.9973C159.617 27.5718 159.419 26.8494 159.419 25.8321V2.63191H155.833V25.8321C155.833 28.3872 156.561 30.1269 158.018 31.0473C159.139 31.7558 160.758 32.0685 162.87 31.9874V28.6564Z" style={{ fill: "var(--_logo-subtle)" }} />
    </>
  );

  return (
    <>
      <path d={LETTER_C} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_M} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E_ACCENT} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_T} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E} style={{ fill: "var(--_logo-text)" }} />
      <path fillRule="evenodd" clipRule="evenodd" d="M26.9324 25.3026L16 0L41.1301 10.3893C45.2246 12.0741 47.927 16.1092 47.9986 20.6123C48.0908 26.8001 43.2388 31.9064 37.1686 32H36.9946C32.6442 32 28.693 29.3793 26.9324 25.3026Z" style={{ fill: "var(--_logo-text)" }} />
      <path fillRule="evenodd" clipRule="evenodd" d="M36.9999 30C40.1949 29.9497 43.0239 28.0578 44.8089 25.6558C44.2219 24.1776 42.7849 23.129 41.1079 23.129H33.978C31.854 23.129 30.113 24.8105 30 26.9197C31.815 28.6605 34.249 30.001 36.8459 30.001C36.8979 30.001 36.9489 30.001 36.9999 30ZM41.7368 17.2203C41.7368 19.5508 39.8588 21.4406 37.5428 21.4406C35.2268 21.4406 33.3488 19.5508 33.3488 17.2203C33.3488 14.8898 35.2268 13 37.5428 13C39.8588 13 41.7368 14.8898 41.7368 17.2203Z" fill={`url(#${lightGradId})`} />


      {/* ── Product text ── */}
      {suffix === "none" ? null : suffix === "bottom" ? (
        <g transform={PRODUCT_LAYOUTS.link.productNameTransform}>{productPaths}</g>
      ) : (
        productPaths
      )}
      <defs >
        <radialGradient id={lightGradId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={GRAD_TRANSFORM}>
          <stop style={{ stopColor: "var(--_logo-gradient-light)" }} />
          <stop offset="0.7358" style={{ stopColor: "var(--_logo-gradient-dark)" }} />
        </radialGradient>
      </defs>
    </>
  );
}

function DarkBody({ darkGradId, suffix }: { darkGradId: string; suffix: LogoSuffix }) {
  const productPaths = (
    <>
      <path d="M169.192 7.44538C168.506 7.44538 167.927 7.21183 167.461 6.74474C166.993 6.27765 166.761 5.71358 166.761 5.0545C166.761 4.39543 166.995 3.82542 167.461 3.34448C167.927 2.86353 168.506 2.62207 169.192 2.62207C169.878 2.62207 170.413 2.86353 170.881 3.34448C171.348 3.82542 171.582 4.39543 171.582 5.0545C171.582 5.71358 171.348 6.27765 170.881 6.74474C170.413 7.21183 169.851 7.44538 169.192 7.44538ZM167.379 31.8093V11.196H170.964V31.8093H167.379Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M186.709 10.6597C189.126 10.6597 191.063 11.4217 192.521 12.9477C193.976 14.4736 194.706 16.5419 194.706 19.1525V31.8094H191.12V19.3583C191.12 17.6819 190.666 16.3836 189.759 15.4632C188.853 14.5429 187.602 14.0818 186.009 14.0818C184.223 14.0818 182.779 14.6379 181.681 15.7522C180.582 16.8645 180.033 18.5765 180.033 20.8843V31.8094H176.448V11.1961H180.033V14.1649C181.489 11.8294 183.715 10.6617 186.711 10.6617L186.709 10.6597Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M217.128 31.8095H212.677L203.28 22.05V31.8095H199.694V2.95076H203.28V20.2707L212.183 11.1961H216.8L206.948 21.1732L217.128 31.8095Z" style={{ fill: "var(--_logo-subtle)" }} />
      <path d="M162.87 28.6564C162.505 28.6604 162.164 28.6604 161.852 28.6564C161.027 28.6425 160.416 28.4229 160.017 27.9973C159.617 27.5718 159.419 26.8494 159.419 25.8321V2.63191H155.833V25.8321C155.833 28.3872 156.561 30.1269 158.018 31.0473C159.139 31.7558 160.758 32.0685 162.87 31.9874V28.6564Z" style={{ fill: "var(--_logo-subtle)" }} />
    </>
  );

  return (
    <>
      <path d={LETTER_C} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_M} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E_ACCENT} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_T} style={{ fill: "var(--_logo-text)" }} />
      <path d={LETTER_E} style={{ fill: "var(--_logo-text)" }} />
      <path fillRule="evenodd" clipRule="evenodd" d="M26.9324 25.3026L16 0L41.1301 10.3893C45.2246 12.0741 47.927 16.1092 47.9986 20.6123C48.0908 26.8001 43.2388 31.9064 37.1686 32H36.9946C32.6442 32 28.693 29.3793 26.9324 25.3026ZM41.7368 17.2203C41.7368 19.5508 39.8588 21.4406 37.5428 21.4406C35.2268 21.4406 33.3488 19.5508 33.3488 17.2203C33.3488 14.8898 35.2268 13 37.5428 13C39.8588 13 41.7368 14.8898 41.7368 17.2203ZM44.8089 25.6558C43.0239 28.0578 40.1949 29.9497 36.9999 30C36.9489 30.001 36.8979 30.001 36.8459 30.001C34.249 30.001 31.815 28.6605 30 26.9197C30.113 24.8105 31.854 23.129 33.978 23.129H41.1079C42.7849 23.129 44.2219 24.1776 44.8089 25.6558Z" fill={`url(#${darkGradId})`} />

      {/* ── Product text ── */}
      {suffix === "none" ? null : suffix === "bottom" ? (
        <g transform={PRODUCT_LAYOUTS.link.productNameTransform}>{productPaths}</g>
      ) : (
        productPaths
      )}

      {/* ── Gradient definition for the compound comet path ── */}
      <defs>
        <radialGradient id={darkGradId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={GRAD_TRANSFORM}>
          <stop style={{ stopColor: "var(--_logo-gradient-light)" }} />
          <stop offset="0.7358" style={{ stopColor: "var(--_logo-gradient-dark)" }} />
        </radialGradient>
      </defs>
    </>
  );
}

/**
 * Link product logo.
 *
 * Renders two SVGs controlled via CSS [data-theme]:
 * - Light brand: multi-path (text exterior + gradient interior)
 * - Dark brand / neutral / inverse: evenodd (gradient with cutout)
 */
export function Link({
  appearance = "brand",
  suffix = "right",
  size = 32,
  className,
}: LogoProps): ReactElement {
  const rootClass = `comete-logo--${appearance}${className ? ` ${className}` : ""}`;

  const viewBox = suffix === "bottom" ? COLUMN_VIEWBOX : suffix === "none" ? WORDMARK_VIEWBOX : VIEWBOX;
  const [,, vbW, vbH] = viewBox.split(" ").map(Number);
  const width = size * ((vbW ?? 1) / (vbH ?? 1));

  const uid = useId();
  const lightGradId = `${uid}l`;
  const darkGradId = `${uid}d`;

  return (
    <span className={rootClass} style={{ display: "inline-flex" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width={width}
        height={size}
        fill="none"
        aria-hidden="true"
        className="comete-logo__light"
      >
        <LightBody lightGradId={lightGradId} suffix={suffix} />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width={width}
        height={size}
        fill="none"
        aria-hidden="true"
        className="comete-logo__dark"
      >
        <DarkBody darkGradId={darkGradId} suffix={suffix} />
      </svg>
    </span>
  );
}

Link.displayName = "Link";
