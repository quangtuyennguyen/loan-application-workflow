import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotFoundView } from './NotFoundView';

const meta: Meta<typeof NotFoundView> = {
  title: 'Exceptions / NotFoundView',
  component: NotFoundView,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof NotFoundView>;

export const Playground: Story = {};
