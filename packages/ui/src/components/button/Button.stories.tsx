import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/button/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

const variants = ["primary", "secondary", "outline"] as const;
const sizes = ["sm", "md", "lg"] as const;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Variants</h3>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>{variant}</Button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size}>Size {size}</Button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Disabled</h3>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>{variant}</Button>
          ))}
        </div>
      </section>
    </div>
  ),
};
