import React, { ComponentProps } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { Account, AccountProps } from ".";

export default {
	title: "Signed In/Account",
	component: Account,
} as Meta;

const Template: Story<ComponentProps<typeof Account>> = (args) => (
	<Account {...args} />
);

export const UserWithEmail = Template.bind({});
UserWithEmail.args = {
	signInState: {
		context: {
			user: {
				authToken: "36fdcd08fdc89275100e85108584e7d8",
				creationDate: "today",
				email: "fred@fred.co",
				paymentsMode: "disabled",
				userId: "guid",
				username: "fred",
			},
		},
		value: "signedIn",
	},
	signInStateSend: () => {},
} as AccountProps;

export const UserWithoutEmail = Template.bind({});
UserWithoutEmail.args = {
	signInState: {
		context: {
			user: {
				authToken: "36fdcd08fdc89275100e85108584e7d8",
				creationDate: "today",
				email: undefined,
				paymentsMode: "disabled",
				userId: "guid",
				username: "fred",
			},
		},
		value: "signedIn",
	},
	signInStateSend: () => {},
} as AccountProps;
