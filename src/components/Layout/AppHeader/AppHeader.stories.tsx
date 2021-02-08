import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import AppHeader from ".";

export default {
	title: "Layout/AppHeader",
	component: AppHeader,
};

const Template: Story<ComponentProps<typeof AppHeader>> = (args) => (
	<AppHeader {...args} />
);

export const AccountNotSignedIn = Template.bind({});
AccountNotSignedIn.args = {
	signInState: {
		value: "notSignedIn",
	},
	title: "Account",
};
