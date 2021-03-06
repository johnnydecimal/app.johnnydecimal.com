// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Link } from "@reach/router";

// === Internal ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import WaitOne from "components/WaitOne";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import {
	SignInContext,
	SignInEvent,
	TSignInStates,
} from "components/SignInStateRouter/signInState.machine";
import { StateValue } from "xstate";

interface MenuProps {
	signInState: {
		context?: SignInContext;
		value: TSignInStates | StateValue;
	};
	signInStateSend: (args: SignInEvent) => void;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const Menu = ({ signInState, signInStateSend }: MenuProps) => {
	switch (signInState.value) {
		case "init" || "tryingSignIn" || "tryingSignUp" || "tryingSignOut":
			return <WaitOne />;
		case "notSignedIn":
			return (
				<div className="p-2">
					<ul className="list-disc list-inside">
						<li className="my-4">
							<Link className="border-b-2 border-gray-800" to="/">
								Sign in
							</Link>
						</li>
						<li className="my-4">
							<Link className="border-b-2 border-gray-800" to="/signup">
								Sign up
							</Link>
						</li>
						<li className="my-4">
							<a
								className="border-b-2 border-gray-800"
								href="https://johnnydecimal.com"
							>
								Go to the main J.D site
							</a>
						</li>
					</ul>
				</div>
			);
		case "signedIn":
			return (
				<div className="p-2">
					<p>Sign in state: {signInState.value}</p>
					<ul className="list-disc list-inside">
						<li className="my-4">
							<Link className="border-b-2 border-gray-800" to="/">
								Main app
							</Link>
						</li>
						<li className="my-4">
							<Link className="border-b-2 border-gray-800" to="/account">
								Your account
							</Link>
						</li>
						<li className="my-4">
							<button
								className="text-red-600 border-b-2 border-red-600"
								onClick={() => {
									signInStateSend({
										type: "TRY_SIGNOUT",
									});
								}}
							>
								Sign out
							</button>
						</li>
					</ul>
				</div>
			);
		case "error":
			// TODO: This isn't very good
			return <div>WTF</div>;
		default:
			// impossible, all states are covered -- but TS needs a JSX element
			return <div>WTF</div>;
			break;
	}

	// if (signInState.value !== "signedIn") {
	// 	return (
	// 		<div className="p-2">
	// 			<p>Sign in state: {signInState.value}</p>
	// 			<ul className="list-disc list-inside">
	// 				<li className="my-4">
	// 					<Link className="border-b-2 border-gray-800" to="/">
	// 						Home (?)
	// 					</Link>
	// 				</li>
	// 				<li className="my-4">
	// 					<Link className="border-b-2 border-gray-800" to="/">
	// 						Er, home again?
	// 					</Link>
	// 				</li>
	// 			</ul>
	// 		</div>
	// 	);
	// } else {
	// 	return (
	// 		<div className="p-2">
	// 			<p>Sign in state: {signInState.value}</p>
	// 			<ul className="list-disc list-inside">
	// 				<li className="my-4">
	// 					<Link className="border-b-2 border-gray-800" to="/">
	// 						Main app
	// 					</Link>
	// 				</li>
	// 				<li className="my-4">
	// 					<Link className="border-b-2 border-gray-800" to="/account">
	// 						Your account
	// 					</Link>
	// 				</li>
	// 				<li className="my-4">
	// 					<button
	// 						className="text-red-600 border-b-2 border-red-600"
	// 						onClick={() => {
	// 							signInStateSend({
	// 								type: "TRY_SIGNOUT",
	// 							});
	// 						}}
	// 					>
	// 						Sign out
	// 					</button>
	// 				</li>
	// 			</ul>
	// 		</div>
	// 	);
	// }
};

export default Menu;
