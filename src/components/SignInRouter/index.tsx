// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { useMachine } from "@xstate/react";
import { Router, RouteComponentProps } from "@reach/router";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import signInStateMachine from "./signInState.machine";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import FourOhFour from "../FourOhFour";
// import JDSignedIn from "./JDSignedIn";
import SignInForm from "../SignInForm";
// import SignUpForm from "./SignUpForm";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const JDSignedIn = ({ signInStateService }: { signInStateService: any }) => (
  <div className="m-16 bg-red-100 font-jdcode">JDSignedIn</div>
);

type SignUpFormProps = RouteComponentProps & {
  path: string;
  signInStateService: any;
};
const SignUpForm = ({ path, signInStateService }: SignUpFormProps) => (
  <div>SignUpForm</div>
);

/**
 * # `SignInRouter`
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
const SignInRouter = () => {
  const [signInState, signInStateSend, signInStateService] = useMachine(
    signInStateMachine
  );

  switch (true) {
    case signInState.matches("init"):
      // TODO: Pretty this 'Initialising' view up
      return <div className="text-3xl text-center text-red-600">INIT</div>;

    case signInState.matches("signedIn"):
      return <JDSignedIn signInStateService={signInStateService} />;

    case signInState.matches("notSignedIn"):
      return (
        <Router>
          <SignInForm path="/" signInStateService={signInStateService} />
          <SignUpForm path="signup" signInStateService={signInStateService} />
          <FourOhFour default={true} signInState={signInState} />
        </Router>
      );

    case signInState.matches("error"):
      // TODO: Pretty this up
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
      return <div>doing a network thing ... standby one</div>;
  }
};

export default SignInRouter;
