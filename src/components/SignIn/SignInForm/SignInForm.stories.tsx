import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import SignInForm from ".";

export default {
	title: "SignInForm",
	component: SignInForm,
};

const Template: Story<ComponentProps<typeof SignInForm>> = (args) => (
	<SignInForm {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
	title: "Account",
};
