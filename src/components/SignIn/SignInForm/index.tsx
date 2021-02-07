// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
type TSignInFormInputs = {
	password: string;
	state: "start" | "tryingSignIn" | "failed";
	userbaseError?: string | null;
	username: string;
};

const SignInForm = ({ state, userbaseError }: TSignInFormInputs) => {
	const {
		register,
		handleSubmit,
		watch,
		errors,
	} = useForm<TSignInFormInputs>();
	const onSubmit = (data: TSignInFormInputs) => console.log(data);

	return (
		// "handleSubmit" will validate your inputs before invoking "onSubmit"
		<form
			className="grid max-w-sm grid-flow-row font-jdcode"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={state === "tryingSignIn"}
				name="username"
				placeholder="username (not email)"
				ref={register({ required: true })}
			/>
			<input
				className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={state === "tryingSignIn"}
				name="password"
				placeholder="password"
				ref={register({ required: true })}
				type="password"
			/>

			{state === "failed" && (
				<div className="p-2 my-2 text-sm text-red-700 border-2 border-red-700">
					{userbaseError}
				</div>
			)}

			{(state === "start" || state === "failed") && (
				<button
					className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
					style={{ boxShadow: "3px 5px rgba(75, 85, 99)" }}
					type="submit"
				>
					Sign in
				</button>
			)}

			{state === "tryingSignIn" && (
				<button
					className="h-10 px-2 py-1 my-2 text-yellow-600 border-2 border-yellow-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
					disabled={true}
					style={{ boxShadow: "3px 5px rgba(217, 119, 6)", cursor: "wait" }}
					type="submit"
				>
					Signing in...
				</button>
			)}
		</form>
	);
};

export default SignInForm;
