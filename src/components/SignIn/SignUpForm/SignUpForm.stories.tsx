import React, { ComponentProps } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import SignUpForm from ".";

export default {
	title: "SignUp/SignUpForm",
	component: SignUpForm,
} as Meta;

const Template: Story<ComponentProps<typeof SignUpForm>> = (args) => (
	<SignUpForm {...args} />
);

export const Start = Template.bind({});
Start.args = {
	signInState: {
		value: "start",
	},
};
export const TryingSignUp = Template.bind({});
TryingSignUp.args = {
	signInState: {
		value: "tryingSignUp",
	},
};
export const Failed = Template.bind({});
Failed.args = {
	signInState: {
		context: {
			error: {
				message: "Signup failed for reasons x, y, z.",
			},
		},
		value: "notSignedIn",
	},
};
