import React, { FunctionComponent } from "react";
// import { RouteComponentProps } from "@reach/router";

export type FourOhFourProps = {
	default: boolean;
	signInState?: object;
};

const FourOhFour: FunctionComponent<FourOhFourProps> = ({ signInState }) => {
	/**
	 * We should only see the 404 when we legitimately are on an invalid route.
	 * We should *not* see it when we're in an interstitial state, e.g. when
	 * logging out.
	 *
	 * The logging here is because I saw a few flashes of that and didn't know
	 * why.
	 */
	console.debug("➃⓪➃: signInState");
	console.debug(signInState);

	return <div>404</div>;
};

export default FourOhFour;
