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
	signInState: "notSignedIn",
};
export const TryingSignIn = Template.bind({});
TryingSignIn.args = {
	signInState: "tryingSignIn",
};
export const Failed = Template.bind({});
Failed.args = {
	signInState: "error",
	userbaseError: "Sign in failed. Try again.",
};
