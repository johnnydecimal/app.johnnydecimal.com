import { Link } from "@reach/router";
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

const Menu = ({ signInState, signInStateSend }: MenuProps) => (
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

export default Menu;
