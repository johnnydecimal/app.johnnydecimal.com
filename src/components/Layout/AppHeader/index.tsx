// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Link } from "@reach/router";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { SignInContext } from "components/SignInStateRouter/signInState.machine";
import { TSignInStates } from "components/SignInStateRouter/signInState.machine";
import { StateValue } from "xstate/lib/types";

export interface IAppHeaderProps {
	signInState: {
		context?: SignInContext;
		value: TSignInStates | StateValue;
	};
	title: string;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const AppHeader = ({ signInState, title }: IAppHeaderProps) => {
	switch (signInState.value) {
		case "notSignedIn" || "try":
			break;

		default:
			break;
	}
	return (
		<header
			className="grid content-between grid-flow-col p-2 border-2 border-gray-800 font-jdcode"
			style={{ gridTemplateColumns: "1fr auto auto" }}
		>
			<div>{title}</div>
			<div className="border-b-2 border-gray-800">
				<Link className="focus:outline-none" to="/menu">
					Menu
				</Link>
			</div>
			{/* <div>😎</div> */}
		</header>
	);
};

export default AppHeader;
