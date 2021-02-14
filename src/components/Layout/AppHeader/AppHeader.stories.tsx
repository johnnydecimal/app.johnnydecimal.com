import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import AppHeader from ".";
import { Router } from "@reach/router";

export default {
	title: "Layout/AppHeader",
	component: AppHeader,
};

const Template: Story<ComponentProps<typeof AppHeader>> = (args) => (
	<Router>
		<AppHeader {...args} />
	</Router>
);

export const NotOnMenuPage = Template.bind({});
NotOnMenuPage.args = {
	default: true, // required to render
	path: "/",
	signInState: {
		value: "notSignedIn",
	},
	title: "Account",
};
export const OnMenuPageDoesNotWork = Template.bind({});
OnMenuPageDoesNotWork.args = {
	default: true, // required to render
	path: "/menu",
	signInState: {
		value: "notSignedIn",
	},
	title: "Account",
};
