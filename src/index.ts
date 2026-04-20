// Styles
import "./styles/logos.css";

// Logos
export { Comete } from "./logos/Comete";
export { OnTime } from "./logos/OnTime";
export { Link } from "./logos/Link";
export { Bi } from "./logos/Bi";
export { Academie } from "./logos/Academie";
export { Club } from "./logos/Club";
export { Mce } from "./logos/Mce";
export { CafeComete } from "./logos/CafeComete";
export { MyComete } from "./logos/MyComete";
export { logoRegistry } from "./registry";

// Composable logo parts
export { ProductIcon } from "./components/ProductIcon";
export type { ProductIconProps } from "./components/ProductIcon";
export { ProductRootName } from "./components/ProductRootName";
export type { ProductRootNameProps } from "./components/ProductRootName";
export {
	ProductSuffix,
	getProductSuffixMetrics,
} from "./components/ProductSuffix";
export type {
	ProductSuffixProps,
	ProductSuffixProduct,
} from "./components/ProductSuffix";

// Types
export type {
	LogoTaglineAlign,
	LogoSuffix,
	LogoAppearance,
	LogoColors,
	LogoFormat,
	LogoProduct,
	LogoProps,
	LogoRegistry,
	LogoType,
} from "./types";
