import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { http, HttpResponse, delay } from 'msw';
import { API_BASE_URL } from '@/lib/config';
import { Providers } from '@/components/Provider';
import { LoanApplicationResult } from './LoanApplicationResult';

const meta: Meta<typeof LoanApplicationResult> = {
  title: 'Loan Application / Result',
  component: LoanApplicationResult,
  decorators: [
    (Story) => (
      <Providers>
        <div className="mx-auto w-[80%]">
          <Story />
        </div>
      </Providers>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof LoanApplicationResult>;


export const Playground: Story = {
  args: { id: 'app-pending-123' },
};

export const Pending: Story = {
  args: { id: 'app-pending-123' },
};

// MSW delays the GET response indefinitely so the loading skeleton remains visible.
export const Loading: Story = {
  args: { id: 'app-loading' },
  parameters: {
    msw: {
      handlers: {
        loanApplication: [
          http.get(`${API_BASE_URL}/api/v1/applications/app-loading`, async () => {
            await delay('infinite');
          }),
        ],
      },
    },
  },
};

// MSW returns a 500 — same error UI triggered by a server fault rather than a missing resource.
export const ServerError: Story = {
  args: { id: 'app-server-error' },
  parameters: {
    msw: {
      handlers: {
        loanApplication: [
          http.get(`${API_BASE_URL}/api/v1/applications/app-server-error`, () =>
            HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
          ),
        ],
      },
    },
  },
};
