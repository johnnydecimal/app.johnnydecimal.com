import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";

import CantGetThereFromHere from ".";

export default {
	title: "Miscellaneous/CantGetThereFromHere",
	component: CantGetThereFromHere,
};

const Template: Story<ComponentProps<typeof CantGetThereFromHere>> = () => (
	<CantGetThereFromHere />
);

export const Default = Template.bind({});
Default.args = {};
