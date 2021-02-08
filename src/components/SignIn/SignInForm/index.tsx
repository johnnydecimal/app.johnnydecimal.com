// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
type TSignInFormInputs = {
	password: string;
	username: string;
};

interface ISignInState {
	value: string;
}

type TSignInFormProps = {
	signInState: ISignInState;
	signInStateSend: (args: any) => void; // TODO: improve this typing
};

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const SignInForm = ({ signInState, signInStateSend }: TSignInFormProps) => {
	console.debug(signInState);
	const {
		register,
		handleSubmit,
		watch,
		errors,
	} = useForm<TSignInFormInputs>();

	const onSubmit = (formData: TSignInFormInputs) => {
		signInStateSend({
			type: "TRY_SIGNIN",
			formData,
		});
	};

	return (
		<form
			className="grid max-w-sm grid-flow-row font-jdcode"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={signInState.value === "tryingSignIn"}
				name="username"
				placeholder="username (not email)"
				ref={register({ required: true })}
			/>
			<input
				className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={signInState.value === "tryingSignIn"}
				name="password"
				placeholder="password"
				ref={register({ required: true })}
				type="password"
			/>

			{/* TODO: feed the actual error in here */}
			{signInState.value === "error" && (
				<div className="p-2 my-2 text-sm text-red-700 border-2 border-red-700">
					ERROR
				</div>
			)}

			{(signInState.value === "notSignedIn" ||
				signInState.value === "error") && (
				<button
					className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
					style={{ boxShadow: "3px 5px rgba(75, 85, 99)" }}
					type="submit"
				>
					Sign in
				</button>
			)}

			{signInState.value === "tryingSignIn" && (
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
