import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ErrorView } from './ErrorView';

const meta: Meta<typeof ErrorView> = {
  title: 'Exceptions / ErrorView',
  component: ErrorView,
  parameters: { layout: 'fullscreen' },
  args: {
    error: new Error('Something went wrong'),
    unstable_retry: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof ErrorView>;

export const Playground: Story = {};
