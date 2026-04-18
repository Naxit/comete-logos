// ---------------------------------------------------------------------------
// Comete — Comète flagship logo (thin wrapper around LogoFrame).
//
// Unlike the product logos, Comete has no wordmark suffix — `suffix="bottom"`
// displays the "gestion pour la sécurité privée" tagline below the wordmark.
// `LogoFrame` dispatches on `product="comete"` to render the bespoke tagline.

import type { ReactElement } from "react";
import { LogoFrame } from "../components/LogoFrame";
import type { LogoProps } from "../types";

export function Comete(props: LogoProps): ReactElement {
	return <LogoFrame product="comete" {...props} />;
}

Comete.displayName = "Comete";
