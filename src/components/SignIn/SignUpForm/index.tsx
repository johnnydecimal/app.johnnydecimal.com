// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { useForm } from "react-hook-form";
import { StateValue } from "xstate";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
interface ISignUpFormInputs {
	password: string;
	username: string;
}

interface ISignUpState {
	context?: {
		error?: {
			message: string;
		};
	};
	value: StateValue;
}

interface ISignUpFormProps {
	signInState: ISignUpState;
	signInStateSend: (args: any) => void; // TODO: improve this typing
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const SignUpForm = ({ signInState, signInStateSend }: ISignUpFormProps) => {
	const {
		register,
		handleSubmit,
		watch,
		errors,
	} = useForm<ISignUpFormInputs>();
	const onSubmit = (data: ISignUpFormInputs) => console.log(data, errors);

	return (
		// "handleSubmit" will validate your inputs before invoking "onSubmit"
		<form
			className="grid max-w-sm grid-flow-row font-jdcode"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={signInState.value === "tryingSignUp"}
				name="username"
				placeholder="username (not email)"
				ref={register({ required: true })}
			/>
			<input
				className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
				disabled={signInState.value === "tryingSignUp"}
				name="password"
				placeholder="password (see warning!)"
				ref={register({ required: true })}
				type="password"
			/>

			<div className="my-2 text-sm text-gray-800 border-2 border-yellow-600">
				<p className="p-2 m-0 font-extrabold text-center text-white underline bg-yellow-600">
					Really important message
				</p>
				{/* <p className="px-2 my-2">
					In some situations, it is <span className="italic">impossible</span>{" "}
					to reset or recover a lost password.
				</p> */}
				<p className="px-2 my-2">
					Your data is end-to-end encrypted. This site has no 'reset your
					password' feature.
				</p>
				<p className="px-2 my-2">
					If you lose your password, your data is gone.
				</p>
				<p className="px-2 my-2">
					You should use{" "}
					<a href="https://en.wikipedia.org/wiki/List_of_password_managers">
						a password manager
					</a>{" "}
					to generate and store a secure, random password.
				</p>
				<p className="px-2 my-2">
					<a href="/security">Click here</a> for more information.
				</p>
			</div>

			{signInState.value === "failed" && (
				<div className="p-2 my-2 text-sm text-red-700 border-2 border-red-700">
					ERROR
				</div>
			)}

			{(signInState.value === "start" || signInState.value === "failed") && (
				<button
					className="h-10 px-2 py-1 my-2 text-gray-600 border-2 border-gray-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
					style={{ boxShadow: "3px 5px rgba(75, 85, 99)" }}
					type="submit"
				>
					Sign up
				</button>
			)}
			{signInState.value === "tryingSignUp" && (
				<button
					className="h-10 px-2 py-1 my-2 text-yellow-600 border-2 border-yellow-600 focus:text-yellow-600 focus:border-yellow-600 focus:outline-none"
					disabled={true}
					style={{ boxShadow: "3px 5px rgba(217, 119, 6)", cursor: "wait" }}
					type="submit"
				>
					Signing up...
				</button>
			)}
		</form>
	);
};

export default SignUpForm;
