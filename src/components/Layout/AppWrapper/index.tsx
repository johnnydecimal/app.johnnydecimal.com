import React, { FunctionComponent } from "react";

const LayoutAppWrapper: FunctionComponent = ({ children }) => (
	<div className="p-16 m-4 text-5xl bg-yellow-100 font-jdcode">{children}</div>
);

export default LayoutAppWrapper;