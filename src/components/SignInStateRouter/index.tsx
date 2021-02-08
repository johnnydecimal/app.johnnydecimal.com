// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { useMachine } from "@xstate/react";
import { Link, useLocation } from "@reach/router";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import signInStateMachine from "./signInState.machine";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import WaitOne from "components/WaitOne";
import AppHeader from "components/Layout/AppHeader";
import SignInForm from "components/SignIn/SignInForm";
import SignUpForm from "components/SignIn/SignUpForm";
import FourOhFour from "components/FourOhFour";
import Account from "components/JDApp/Account";
import App from "App";

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
					<AppHeader title="Initialising..." />
					<WaitOne />
				</>
			);

		case signInState.matches("signedIn"):
			switch (location.pathname) {
				case "/":
					return (
						<>
							<AppHeader title="The app" />
							<div>This is the app now</div>
							<Link to="/account">Your account</Link>
							<br />
							<Link to="/ojlkjdflkjla">A 404</Link>
						</>
					);
				case "/account":
					return (
						<>
							<AppHeader title="Account" />
							<Account signInStateSend={signInStateSend} />
							<Link to="/">Home</Link>
						</>
					);
				default:
					return (
						<>
							<AppHeader title="404 :-(" />
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
							<AppHeader title="Sign in" />
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
							<AppHeader title="Sign up" />
							{/* <SignUpForm /> */}
						</>
					);

				default:
					return (
						<>
							<AppHeader title="404 :-(" />
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
					<AppHeader title="Standby one..." />
					<div>Standby while we do a network thing...</div>
				</>
			);
	}
};

export default SignInStateRouter;
