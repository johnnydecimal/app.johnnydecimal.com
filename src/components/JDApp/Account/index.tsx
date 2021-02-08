interface IAccountProps {
	signInStateSend: (args: any) => void;
}

export default function Account({ signInStateSend }: IAccountProps) {
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
