// @ts-nocheck
import vhCheck from "vh-check";
const vhCheckResult = vhCheck();

const WaitOne = () => (
	<div
		className="grid grid-flow-row p-2 text-3xl border border-pink-500"
		style={{
			gridTemplateRows: "100px 100px 1fr",
			height: vhCheckResult.vh - 30,
		}}
	>
		<p className="bg-blue-100">first</p>
		<p className="bg-purple-100">second</p>
		<p className="bg-pink-100">third</p>
	</div>
);

export default WaitOne;
