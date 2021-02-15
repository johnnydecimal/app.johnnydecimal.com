// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { SignInEvent } from "components/SignInStateRouter/signInState.machine";
import { userInfo } from "os";
import { UserResult } from "userbase-js";
import { StateValue } from "xstate";

interface SignInState {
	context: {
		error?: {
			message: string;
		};
		user: UserResult;
	};
	value: StateValue;
}

interface AccountProps {
	signInState: SignInState;
	signInStateSend: (args: SignInEvent) => void;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
export default function Account({
	signInState,
	signInStateSend,
}: AccountProps) {
	console.debug("🅾️ Account: signInState:", signInState);

	const { user } = signInState.context;

	return (
		// TODO: this grid with gap-4 is too inflexible, just make it a boring old div
		<div className="px-2 mt-8 border border-pink-500 font-jdcode">
			<div>Hey there, {user.username}.</div>

			<h2 className="max-w-xs mt-2 border-b-2 border-gray-800">Email</h2>
			{user.email ? <div>{user.email}</div> : <div>Set an email address.</div>}
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
		</div>
	);
}
