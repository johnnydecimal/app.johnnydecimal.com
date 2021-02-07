// @ts-nocheck

// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React from "react";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import SignInStateRouter from "components/SignInStateRouter";
import LayoutAppWrapper from "components/Layout/AppWrapper";
import { Button } from "stories/Button";
import { Router } from "@reach/router";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
function App() {
	return (
		<Router>
			<LayoutAppWrapper default>
				<SignInStateRouter default />
			</LayoutAppWrapper>
		</Router>
	);
}

export default App;
