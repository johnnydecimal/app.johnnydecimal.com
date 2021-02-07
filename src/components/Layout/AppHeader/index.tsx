import { FunctionComponent as FC } from "react";

type T = {
	title: string;
};

const AppHeader: FC<T> = ({ title }) => (
	<header
		className="grid content-between grid-flow-col p-2 border-2 border-gray-800 font-jdcode"
		style={{ gridTemplateColumns: "1fr auto auto" }}
	>
		<div>{title}</div>
		<div className="mx-4 border-b-2 border-gray-800">Menu</div>
		<div>😎</div>
	</header>
);

export default AppHeader;
