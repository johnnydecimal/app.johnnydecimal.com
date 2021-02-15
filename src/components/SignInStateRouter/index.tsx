// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { useMachine } from "@xstate/react";
import { Link, useLocation } from "@reach/router";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import signInStateMachine, { TSignInStates } from "./signInState.machine";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import WaitOne from "components/WaitOne";
import AppHeader from "components/Layout/AppHeader";
import { SignInForm } from "components/SignIn/SignInForm";
import SignUpForm from "components/SignIn/SignUpForm";
import FourOhFour from "components/FourOhFour";
// TODO: Make all imports named vs. default.
import { Account } from "components/JDApp/Account";
import Error from "components/Error";
import App from "App";
import Menu from "components/JDApp/Menu";
import CantGetThereFromHere from "components/CantGetThereFromHere";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===

/**
 * # `SignInStateRouter`
 *
 * The topmost component in the app.
 *
 * The first thing we do on a page load is to determine, by way of our
 * `signInStateMachine`, which calls Userbase, whether the user is signed in.
 *
 * We use switch/case to render the appropriate component depending on the
 * current `pathname` and `signInState`.
 */
const SignInStateRouter = () => {
	const [signInState, signInStateSend, signInStateService] = useMachine(
		signInStateMachine
	);

	const location = useLocation();
	console.debug("🅾️ SignInStateRouter: signInState:", signInState);

	switch (location.pathname) {
		// == /         ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
		case "/":
			switch (signInState.value) {
				case "notSignedIn":
					return (
						<>
							<AppHeader signInState={signInState} title="Sign in" />
							<SignInForm
								signInState={signInState}
								signInStateSend={signInStateSend}
							/>
						</>
					);
				case "signedIn":
					return (
						<>
							<AppHeader signInState={signInState} title="Sign in" />
							<div>This is the app now</div>
						</>
					);
				case "init":
				case "tryingSignIn":
				case "tryingSignUp":
				case "tryingSignOut":
					return (
						<>
							<AppHeader signInState={signInState} title="Wait one..." />
							<WaitOne />
						</>
					);
				case "error":
					return (
						<>
							<AppHeader signInState={signInState} title="Error" />
							<Error />
						</>
					);
				default:
					return <div>impossible? {signInState.value}</div>;
			}

		// == /signup   ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
		case "/signup":
			switch (signInState.value) {
				case "notSignedIn":
					return (
						<>
							<AppHeader signInState={signInState} title="Sign up" />
							<SignUpForm
								signInState={signInState}
								signInStateSend={signInStateSend}
							/>
						</>
					);
				case "signedIn":
					return (
						<>
							<AppHeader signInState={signInState} title="No can do!" />
							<CantGetThereFromHere />
						</>
					);
				case "init":
				case "tryingSignIn":
				case "tryingSignUp":
				case "tryingSignOut":
					return (
						<>
							<AppHeader signInState={signInState} title="Wait one..." />
							<WaitOne />
						</>
					);
				case "error":
					return (
						<>
							<AppHeader signInState={signInState} title="Error" />
							<Error />
						</>
					);
				default:
					return <div>impossible? {signInState.value}</div>;
			}

		// == /account  ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
		case "/account":
			switch (signInState.value) {
				case "notSignedIn":
					return (
						<>
							<AppHeader signInState={signInState} title="No can do!" />
							<CantGetThereFromHere />
						</>
					);
				case "signedIn":
					return (
						<>
							<AppHeader signInState={signInState} title="Account" />
							<Account
								signInState={signInState}
								signInStateSend={signInStateSend}
							/>
						</>
					);
				case "init":
				case "tryingSignIn":
				case "tryingSignUp":
				case "tryingSignOut":
					return (
						<>
							<AppHeader signInState={signInState} title="Wait one..." />
							<WaitOne />
						</>
					);
				case "error":
					return (
						<>
							<AppHeader signInState={signInState} title="Error" />
							<Error />
						</>
					);
				default:
					return <div>impossible? {signInState.value}</div>;
			}

		// == /menu     ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
		case "/menu":
			switch (signInState.value) {
				case "notSignedIn":
				case "signedIn":
					return (
						<>
							<AppHeader signInState={signInState} title="Menu" />
							<Menu
								signInState={signInState}
								signInStateSend={signInStateSend}
							/>
						</>
					);
				case "init":
				case "tryingSignIn":
				case "tryingSignUp":
				case "tryingSignOut":
					return (
						<>
							<AppHeader signInState={signInState} title="Wait one..." />
							<WaitOne />
						</>
					);
				case "error":
					return (
						<>
							<AppHeader signInState={signInState} title="Error" />
							<Error />
						</>
					);
				default:
					return <div>impossible? {signInState.value}</div>;
			}

		// == 404       ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
		default:
			return <FourOhFour />;
	}
};

export default SignInStateRouter;
