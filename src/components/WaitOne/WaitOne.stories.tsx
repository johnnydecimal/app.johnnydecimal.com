import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import WaitOne from ".";

export default {
	title: "Miscellaneous/WaitOne",
	component: WaitOne,
};

const Template: Story<ComponentProps<typeof WaitOne>> = () => <WaitOne />;

export const Default = Template.bind({});
Default.args = {};
