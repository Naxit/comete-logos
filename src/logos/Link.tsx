// ---------------------------------------------------------------------------
// Link — Comète "link" logo (thin wrapper around LogoFrame).

import type { ReactElement } from "react";
import { LogoFrame } from "../components/LogoFrame";
import type { LogoProps } from "../types";

export function Link(props: LogoProps): ReactElement {
	return <LogoFrame product="link" {...props} />;
}

Link.displayName = "Link";
