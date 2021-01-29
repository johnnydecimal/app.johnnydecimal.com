// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React from "react";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import SignInRouter from "./components/SignInRouter";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
function App() {
  return (
    <React.StrictMode>
      <SignInRouter />
    </React.StrictMode>
  );
}

export default App;
