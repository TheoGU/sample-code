import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Calendar, CalendarProps } from "./index";

export default {
  title: "Components/Input/Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args: CalendarProps) => {
  return <Calendar {...args} />;
};

export const CalendarStandard = Template.bind({});
CalendarStandard.args = {
  showWeek: false,
  value: new Date(),
};

export const CalendarWeek = Template.bind({});
CalendarWeek.args = {
  showWeek: true,
  value: new Date("2022-11-01"),
};
