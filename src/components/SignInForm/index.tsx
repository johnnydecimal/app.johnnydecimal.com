// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React from "react";
import { Interpreter } from "xstate";
import { useService } from "@xstate/react";
import { useForm } from "react-hook-form";
import { Link } from "@reach/router";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import {
	SignInContext,
	SignInSchema,
	SignInEvent,
} from "../machines/newSignInState.machine";

/**
 * # SignInForm
 *
 * - A form which allows the user to sign in.
 * - All signing-in logic is handled by `signInStateMachine`: this thing just
 *   sends the machine an event.
 *
 * @param {object} signInStateService - XState/signInStateMachine
 */
const SignInForm = ({
	redirectMessage,
	signInStateService,
}: {
	redirectMessage?: string;
	signInStateService: Interpreter<SignInContext, SignInSchema, SignInEvent>;
}) => {
	const [signInState, signInStateSend] = useService(signInStateService);
	const { register, handleSubmit } = useForm();

	const signIn = (formData: any) => {
		console.debug("🎒signIn:", formData);
		/** So the login form needs to pass the credentials that the user has
		 *  entered *to the machine*, and the machine will do all of the logging in.
		 *
		 *  This will send an event to the service. They look like this:
		 *  https://xstate.js.org/docs/guides/events.html#sending-events
		 */
		signInStateSend({
			type: "TRY_SIGNIN",
			formData,
		});
	};

	return (
		<div className="mx-8 mt-8 font-jdmono">
			<h1 className="mb-2 text-2xl font-bold border-b border-gray-800">
				Sign in
			</h1>
			<p className="mb-4 text-xs">
				Do you need to{" "}
				<Link to="/signup" className="text-blue-600">
					sign up?
				</Link>
			</p>
			{signInState.context.error ? (
				<div className="text-red-700">{signInState.context.error.message}</div>
			) : null}
			{redirectMessage ? <div>{redirectMessage}</div> : null}
			<form onSubmit={handleSubmit(signIn)} className="flex flex-col">
				<label htmlFor="username" className="text-sm">
					Username
				</label>
				<input
					id="username"
					name="username"
					ref={register}
					className="px-2 py-1 mb-2 border-2 shadow-inner focus:outline-none "
					style={{
						borderColor: "#CFAD8F",
						boxShadow: "-4px 4px 0 -2px rgba(22, 22, 22, 0.4)",
					}}
				/>
				<label htmlFor="password" className="text-sm">
					Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					ref={register}
					className="px-2 py-1 mb-2 border-2 shadow-inner focus:outline-none "
					style={{
						borderColor: "#CFAD8F",
						boxShadow: "-4px 4px 0 -2px rgba(22, 22, 22, 0.4)",
					}}
				/>
				{!signInState.matches("tryingSignIn") ? (
					<button
						className="px-2 py-1 mt-4 text-xl font-bold border-4 shadow-inner focus:outline-none"
						style={{
							backgroundColor: "#CECEF5",
							borderColor: "#CFAD8F",
							boxShadow: "-4px 4px 0 -2px rgba(22, 22, 22, 0.4)",
						}}
						onClick={handleSubmit(signIn)}
					>
						Log in
					</button>
				) : (
					<button
						disabled
						className="px-2 py-1 mt-4 text-xl font-bold border-4 shadow-inner focus:outline-none"
						style={{
							backgroundColor: "#CCCCCC",
							borderColor: "#CFAD8F",
							boxShadow: "-4px 4px 0 -2px rgba(22, 22, 22, 0.4)",
							cursor: "wait",
						}}
					>
						Logging in...
					</button>
				)}
			</form>
		</div>
	);
};

export default SignInForm;
