// ---------------------------------------------------------------------------
// Mce — Comète "mce" logo (thin wrapper around LogoFrame).

import type { ReactElement } from "react";
import { LogoFrame } from "../components/LogoFrame";
import type { LogoProps } from "../types";

export function Mce(props: LogoProps): ReactElement {
	return <LogoFrame product="mce" {...props} />;
}

Mce.displayName = "Mce";
