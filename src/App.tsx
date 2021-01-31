// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React from "react";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import SignInStateRouter from "components/SignInStateRouter";
import LayoutAppWrapper from "components/Layout/AppWrapper";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
function App() {
	return (
		<LayoutAppWrapper>
			<SignInStateRouter />
		</LayoutAppWrapper>
	);
}

export default App;
