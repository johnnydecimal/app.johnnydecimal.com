import { Link } from "@reach/router";

const CantGetThereFromHere = () => (
	<div className="p-2 font-jdcode">
		You can't get there from here. You probably need to be{" "}
		<Link className="border-b-2 border-gray-800" to="/">
			signed in?
		</Link>
	</div>
);

export default CantGetThereFromHere;
