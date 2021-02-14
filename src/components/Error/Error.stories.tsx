import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import Error from ".";

export default {
	title: "Miscellaneous/Error",
	component: Error,
};

const Template: Story<ComponentProps<typeof Error>> = () => <Error />;

export const Default = Template.bind({});
Default.args = {};
