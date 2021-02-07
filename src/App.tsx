// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React from "react";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import SignInStateRouter from "components/SignInStateRouter";
import LayoutAppWrapper from "components/Layout/AppWrapper";
import { Button } from "stories/Button";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
function App() {
	return (
		<LayoutAppWrapper>
			<SignInStateRouter />
			<Button label="Jeez Louise, a button!" />
		</LayoutAppWrapper>
	);
}

export default App;
