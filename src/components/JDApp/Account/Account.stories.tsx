import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import Account from ".";

export default {
	title: "Account",
	component: Account,
};

const Template: Story<ComponentProps<typeof Account>> = (args) => (
	<Account {...args} />
);

export const Settings = Template.bind({});
Settings.args = {
	signInState: {
		context: {
			user: {
				username: "fred",
			},
		},
		value: "signedIn",
	},
	title: "Account",
};
