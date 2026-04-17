import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "@tuyennq/ui/components/input/InputField";
import { Button } from "@tuyennq/ui/components/button/Button";

const meta: Meta<typeof InputField> = {
  title: "UI/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder text",
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "jane@example.com",
  },
};

export const WithError: Story = {
  args: {
    label: "Email address",
    placeholder: "jane@example.com",
    error: "Enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled field",
    placeholder: "Not editable",
    disabled: true,
  },
};

export const WithLeadingButton: Story = {
  args: {
    label: "Website",
    placeholder: "example.com",
    leadingButton: <Button variant="outline">https://</Button>,
  },
};

export const WithTrailingButton: Story = {
  args: {
    label: "Coupon",
    placeholder: "Enter code",
    trailingButton: <Button variant="primary">Apply</Button>,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputField size="sm" label="Small" placeholder="Small input" />
      <InputField size="md" label="Medium" placeholder="Medium input" />
      <InputField size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputField variant="gray" label="Gray" placeholder="Gray variant" />
      <InputField variant="primary" label="Primary" placeholder="Primary variant" />
      <InputField variant="error" label="Error" placeholder="Error variant" />
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    leadingIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    trailingIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputField variant="gray" label="Gray disabled" placeholder="Disabled" disabled />
      <InputField variant="primary" label="Primary disabled" placeholder="Disabled" disabled />
      <InputField variant="error" label="Error disabled" placeholder="Disabled" disabled />
    </div>
  ),
};
