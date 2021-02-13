// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { SignInEvent } from "components/SignInStateRouter/signInState.machine";

interface AccountProps {
	signInStateSend: (args: SignInEvent) => void;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
export default function Account({ signInStateSend }: AccountProps) {
	return (
		<div>
			<button
				onClick={() => {
					signInStateSend({
						type: "TRY_SIGNOUT",
					});
				}}
			>
				Sign out
			</button>
		</div>
	);
}
