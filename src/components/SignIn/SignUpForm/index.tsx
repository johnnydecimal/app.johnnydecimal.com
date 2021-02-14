// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { useForm } from "react-hook-form";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { SignInEvent } from "components/SignInStateRouter/signInState.machine";
import { StateValue } from "xstate";

interface SignUpFormInputs {
	password: string;
	username: string;
}

interface SignUpState {
	context?: {
		error?: {
			message: string;
		};
	};
	value: StateValue;
}

interface SignUpFormProps {
	signInState: SignUpState;
	signInStateSend: (args: SignInEvent) => void;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const SignUpForm = ({ signInState, signInStateSend }: SignUpFormProps) => {
	const { register, handleSubmit, watch, errors } = useForm<SignUpFormInputs>();

	const onSubmit = (formData: SignUpFormInputs) => {
		signInStateSend({
			type: "TRY_SIGNUP",
			formData,
		});
	};

	return (
		<form
			className="grid justify-center grid-flow-row gap-4 mt-8 font-jdcode"
			onSubmit={handleSubmit(onSubmit)}
		>
			{/* == Username input ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			<input
				className="h-10 px-2 py-1 text-gray-600 border-2 border-gray-600 rounded-none w-72 focus:text-green-600 focus:border-green-600 focus:outline-none"
				disabled={signInState.value === "tryingSignUp"}
				name="username"
				placeholder="username (not email)"
				ref={register({ required: true })}
			/>
			{/* == Password input ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			<input
				className="h-10 px-2 py-1 text-gray-600 border-2 border-gray-600 rounded-none w-72 focus:text-green-600 focus:border-green-600 focus:outline-none"
				disabled={signInState.value === "tryingSignUp"}
				name="password"
				placeholder="password"
				ref={register({ required: true })}
				type="password"
			/>

			{/* == Error message  ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			{signInState.context &&
			signInState.context.error &&
			signInState.context.error.message ? (
				signInState.value === "notSignedIn" ? (
					<div
						className="p-2 text-sm text-red-700 border-2 border-red-700 rounded-none w-72"
						style={{ minHeight: "2.5rem" }}
					>
						{signInState.context.error.message}
					</div>
				) : (
					<div
						className="p-2 text-sm text-gray-300 border-2 border-gray-600 rounded-none w-72"
						style={{ minHeight: "2.5rem" }}
					>
						Let's try again...
					</div>
				)
			) : null}

			{/* == Sign in button ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			{(signInState.value === "notSignedIn" ||
				signInState.value === "error") && (
				<button
					className="h-10 px-2 py-1 text-gray-600 border-2 border-gray-600 rounded-none w-72 focus:text-green-600 focus:border-green-600 focus:outline-none"
					style={{ boxShadow: "3px 5px rgba(75, 85, 99)" }}
					type="submit"
				>
					Sign up
				</button>
			)}

			{/* == Signing in button ==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			{signInState.value === "tryingSignUp" && (
				<button
					className="h-10 px-2 py-1 text-green-600 border-2 border-green-600 rounded-none w-72 focus:text-green-600 focus:border-green-600 focus:outline-none"
					disabled={true}
					style={{ boxShadow: "3px 5px rgba(5, 150, 105)", cursor: "wait" }}
					type="submit"
				>
					Signing up...
				</button>
			)}
		</form>
	);
};

export default SignUpForm;
