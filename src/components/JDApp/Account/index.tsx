// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { SignInEvent } from "components/SignInStateRouter/signInState.machine";
import { StateValue } from "xstate";
import userbase, { UserResult } from "userbase-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "types/User";

interface SignInState {
	context: {
		error?: {
			message: string;
		};
		user: User;
	};
	value: StateValue;
}

export interface AccountProps {
	signInState: SignInState;
	signInStateSend: (args: SignInEvent) => void;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
interface EmailFormInput {
	email: string;
}

const Email = ({ user, signInStateSend }: any) => {
	/**
	 * This component shows the status of the user's email, and allows them to
	 * change it.
	 *
	 * We're going to need:
	 * - Their `user` object from Userbase.
	 * - Some Userbase methods to allow us to update the email address.
	 */
	const [updating, setUpdating] = useState(false);
	const { register, handleSubmit, watch, errors } = useForm<EmailFormInput>();

	const onSubmit = (formData: EmailFormInput) => {
		console.debug("⛺️ just about to hit userbase");
		signInStateSend({
			type: "UPDATE_EMAIL",
			formData,
		});
	};

	if (user.email) {
		if (!updating) {
			// Just show their address
			return (
				<>
					<div className="p-2 my-1 rounded-none w-80 ring ring-inset ring-gray-200">
						{user.email}
					</div>
					<div className="grid grid-flow-col mt-1 w-80">
						<button
							className="p-2 text-xs place-self-start"
							onClick={() => setUpdating(true)}
						>
							CHANGE
						</button>
					</div>
				</>
			);
		} else {
			return (
				<>
					<form className="my-1" onSubmit={handleSubmit(onSubmit)}>
						<input
							className="p-2 text-red-600 rounded-none w-80 ring ring-inset ring-red-600 focus:outline-none"
							defaultValue={user.email}
							name="email"
							onKeyPress={(e) => {
								console.debug("onKeyUp, e is:", e);
								if (e.key === "Enter" && !e.shiftKey) {
									handleSubmit(onSubmit)();
								}
							}}
							ref={register({ required: true })}
							type="email"
						/>
						<div className="grid grid-flow-col mt-1 w-80">
							<button
								className="p-2 text-xs text-red-600 place-self-start"
								name="cancel"
								onClick={() => setUpdating(false)}
								ref={register}
							>
								CANCEL
							</button>
							<button
								className="p-2 text-xs text-green-500 ring ring-inset ring-green-500 place-self-end"
								name="update"
								onClick={handleSubmit(onSubmit)}
								ref={register}
								type="submit"
							>
								UPDATE
							</button>
						</div>
					</form>
				</>
			);
		}
	} else {
		return (
			<div className="text-sm">
				<p className="my-1">You haven't supplied an email address.</p>
				<p className="my-1">
					This makes it impossible to recover your password. But if you're
					confident you're never going to lose it, that's cool.
				</p>
				<p>
					To add your email address, click here. Password recovery is the only
					thing it's <span className="font-semibold">ever</span> used for.
				</p>
			</div>
		);
	}
};

export const Account = ({ signInState, signInStateSend }: AccountProps) => {
	console.debug("🅾️ Account: signInState:", signInState);

	const { user } = signInState.context;

	return (
		<div className="px-2 mt-8 font-jdcode">
			<div>Hey there, {user.username}.</div>

			<h2 className="max-w-xs my-2 border-b-2 border-gray-800">Email</h2>
			<Email
				signInStateSend={signInStateSend}
				user={signInState.context.user}
			/>

			{/* Sign out button */}
			<div className="mt-2">
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
};
