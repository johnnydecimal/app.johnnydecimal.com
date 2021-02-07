import React, { ComponentProps } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import SignInForm from ".";

export default {
	title: "SignUp/SignInForm",
	component: SignInForm,
} as Meta;

const Template: Story<ComponentProps<typeof SignInForm>> = (args) => (
	<SignInForm {...args} />
);

export const Start = Template.bind({});
Start.args = {
	state: "start",
};
export const TryingSignIn = Template.bind({});
TryingSignIn.args = {
	state: "tryingSignIn",
};
export const Failed = Template.bind({});
Failed.args = {
	state: "failed",
	userbaseError: "Sign in failed. Try again.",
};
