import React, { FunctionComponent } from "react";
import { useLocation } from "@reach/router";

interface ILayoutAppWrapper {
	children: React.ReactNode;
}

/**
 * # `LayoutAppWrapper`
 *
 * @param children {ReactNode[]}
 *
 * A lightweight wrapper around the entire application. Renders the children
 * that it is passed without further wrapping them in e.g. a grid.
 *
 * - Sets the maximum width.
 * - Centres content.
 * - Sets a default font.
 *
 */
const LayoutAppWrapper = ({ children }: ILayoutAppWrapper) => {
	return (
		<div className="max-w-4xl mx-auto mt-2 bg-yellow-100 font-jdcode">
			{children}
		</div>
	);
};

export default LayoutAppWrapper;
