import React, { ComponentProps } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import { SignInForm, SignInFormProps } from ".";

export default {
	title: "SignUp/SignInForm",
	component: SignInForm,
} as Meta;

// https://github.com/storybookjs/storybook/blob/next/docs/snippets/react/page-story.ts.mdx
const Template: Story<SignInFormProps> = (args) => <SignInForm {...args} />;

export const Start = Template.bind({});
Start.args = {
	signInState: {
		value: "notSignedIn",
	},
};

export const TryingSignIn = Template.bind({});
TryingSignIn.args = {
	signInState: {
		value: "tryingSignIn",
	},
};

export const Failed = Template.bind({});
Failed.args = {
	signInState: {
		context: {
			error: {
				message: "Username or password mismatch.",
			},
		},
		value: "notSignedIn",
	},
};

export const TryingSignInAfterError = Template.bind({});
TryingSignInAfterError.args = {
	signInState: {
		context: {
			error: {
				message: "Username or password mismatch.",
			},
		},
		value: "tryingSignIn",
	},
};
