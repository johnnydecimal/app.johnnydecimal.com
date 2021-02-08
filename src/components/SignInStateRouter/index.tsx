// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { useMachine } from "@xstate/react";
import { Link, useLocation } from "@reach/router";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import signInStateMachine, { TSignInStates } from "./signInState.machine";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import WaitOne from "components/WaitOne";
import AppHeader from "components/Layout/AppHeader";
import SignInForm from "components/SignIn/SignInForm";
import SignUpForm from "components/SignIn/SignUpForm";
import FourOhFour from "components/FourOhFour";
import Account from "components/JDApp/Account";
import App from "App";
import Menu from "components/JDApp/Menu";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===

/**
 * # `SignInStateRouter`
 *
 * The topmost component in the app.
 *
 * The first thing we do on a page load is to determine, by way of our
 * `signInStateMachine`, which calls Userbase, whether the user is signed in.
 *
 * Depending on the machine's state, we render:
 * - An initialisation screen.
 * - If signed in, `JDApp`, which is the full, we-have-a-user-and-we-have-
 *   their-data component.
 * - If not signed in:
 *   - At `/`, show a login screen.
 *   - At `/signup/`, show a signup screen.
 *   - Anywhere else, show a 404.
 * - If the machine returns `error`, that's deeply strange. Nevertheless,
 *   handle it.
 * - The machine has other interstitial states: `trying[thing]`. In those
 *   states, handled by the `default` condition, render a 'please hold' type
 *   screen.
 */
const SignInStateRouter = () => {
	const [signInState, signInStateSend, signInStateService] = useMachine(
		signInStateMachine
	);
	const location = useLocation();
	console.debug("SignInStateRouter: signInState:", signInState);
	console.debug("SignInStateRouter: typeof signInState:", typeof signInState);

	switch (true) {
		case signInState.matches("init"):
			return (
				<>
					<AppHeader signInState={signInState} title="Initialising..." />
					<WaitOne />
				</>
			);

		case signInState.matches("signedIn"):
			switch (location.pathname) {
				case "/":
					return (
						<>
							<AppHeader signInState={signInState} title="The app" />
							<div className="p-2 mt-4">This is the app now</div>
						</>
					);
				case "/account":
					return (
						<>
							<AppHeader signInState={signInState} title="Account" />
							<Account signInStateSend={signInStateSend} />
							<Link to="/">Home</Link>
						</>
					);
				case "/menu":
					return (
						<>
							<AppHeader signInState={signInState} title="Menu" />
							<Menu signInStateSend={signInStateSend} />
						</>
					);
				default:
					return (
						<>
							<AppHeader signInState={signInState} title="404 :-(" />
							<FourOhFour signInState={signInState} />
						</>
					);
			}

		// case signInState.matches("notSignedIn"):
		case ["notSignedIn", "tryingSignIn"].some(signInState.matches):
			switch (location.pathname) {
				case "/":
					return (
						<>
							<AppHeader signInState={signInState} title="Sign in" />
							<SignInForm
								// TODO: fix me up
								// @ts-ignore
								signInState={signInState}
								signInStateSend={signInStateSend}
							/>
						</>
					);

				case "/signup":
					return (
						<>
							<AppHeader signInState={signInState} title="Sign up" />
							{/* <SignUpForm /> */}
						</>
					);

				default:
					return (
						<>
							<AppHeader signInState={signInState} title="404 :-(" />
							<FourOhFour />
						</>
					);
			}

		/* <SignInForm path="/" signInStateService={signInStateService} />
			<SignUpForm path="signup" signInStateService={signInStateService} />
			<FourOhFour default={true} signInState={signInState} /> */

		case signInState.matches("error"):
			// TODO: You ended up here once. No idea why. Fix.
			return (
				<div className="m-12 text-6xl text-red-600">
					ERROR! End-of-state. Done. Fubar.
				</div>
			);

		/**
		 * All other conditions are captured here -- the `trying...` states and
		 * anything else not specifically handled above. This works out to be a much
		 * nicer way of handling this -- when this was an `if...then` situation you
		 * saw 404s when signing out, but now this captures those little edge cases.
		 */
		default:
			return (
				<>
					<AppHeader signInState={signInState} title="Standby one..." />
					<div>Standby while we do a network thing...</div>
				</>
			);
	}
};

export default SignInStateRouter;
