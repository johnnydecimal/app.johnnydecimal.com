// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React from "react";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import SignInRouter from "./components/SignInRouter";
import VAppWrapper from "./components/VAppWrapper";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
function App() {
	return (
		<React.StrictMode>
			<VAppWrapper>
				<SignInRouter />
			</VAppWrapper>
		</React.StrictMode>
	);
}

export default App;
