// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { useForm } from "react-hook-form";
import { Link } from "@reach/router";
import { StateValue } from "xstate";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
interface ISignInFormInputs {
	password: string;
	username: string;
}

interface ISignInState {
	context?: {
		error?: {
			message: string;
		};
	};
	value: StateValue;
}

interface ISignInFormProps {
	signInState: ISignInState;
	signInStateSend: (args: any) => void; // TODO: improve this typing
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const SignInForm = ({ signInState, signInStateSend }: ISignInFormProps) => {
	const {
		register,
		handleSubmit,
		watch,
		errors,
	} = useForm<ISignInFormInputs>();

	const onSubmit = (formData: ISignInFormInputs) => {
		signInStateSend({
			type: "TRY_SIGNIN",
			formData,
		});
	};

	console.debug("SignInForm: signInState:", signInState);

	return (
		<form
			className="grid justify-center grid-flow-row gap-4 mt-8 font-jdcode"
			onSubmit={handleSubmit(onSubmit)}
		>
			{/* == Username input ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			<input
				className="h-10 px-2 py-1 text-gray-600 border-2 border-gray-600 rounded-none w-72 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={signInState.value === "tryingSignIn"}
				name="username"
				placeholder="username (not email)"
				ref={register({ required: true })}
			/>
			{/* == Password input ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			<input
				className="h-10 px-2 py-1 text-gray-600 border-2 border-gray-600 rounded-none w-72 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={signInState.value === "tryingSignIn"}
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
					className="h-10 px-2 py-1 text-gray-600 border-2 border-gray-600 rounded-none w-72 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
					style={{ boxShadow: "3px 5px rgba(75, 85, 99)" }}
					type="submit"
				>
					Sign in
				</button>
			)}

			{/* == Signing in button ==-==-==-==-==-==-==-==-==-==-==-==-==-==-== */}
			{signInState.value === "tryingSignIn" && (
				<button
					className="h-10 px-2 py-1 text-yellow-600 border-2 border-yellow-600 rounded-none w-72 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
					disabled={true}
					style={{ boxShadow: "3px 5px rgba(217, 119, 6)", cursor: "wait" }}
					type="submit"
				>
					Signing in...
				</button>
			)}

			<div className="h-10 px-2 py-1 mt-8 text-indigo-600 border-2 border-indigo-600 rounded-none bg-indigo-50 w-72">
				Do you need to{" "}
				<Link className="border-b-2 border-indigo-600" to="/signup">
					sign up
				</Link>
				?
			</div>
		</form>
	);
};

export default SignInForm;
