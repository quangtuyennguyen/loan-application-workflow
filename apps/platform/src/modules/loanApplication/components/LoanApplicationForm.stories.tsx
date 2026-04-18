import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { http, HttpResponse, delay } from 'msw';
import { userEvent, within, expect } from 'storybook/test';
import { API_BASE_URL } from '@/lib/config';
import { Providers } from '@/components/Provider';
import { LoanApplicationForm } from './LoanApplicationForm';

const meta: Meta<typeof LoanApplicationForm> = {
  title: 'Loan Application / Form',
  component: LoanApplicationForm,
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
    nextjs: {
      appDirectory: true,
      navigation: {
        push: () => {},
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoanApplicationForm>;

export const Playground: Story = {};

// Submitting an empty form surfaces required-field messages for every field.
export const WithFormValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /submit application/i }));

    expect(await canvas.findByText('Full name is required')).toBeInTheDocument();
    expect(await canvas.findByText('Email is required')).toBeInTheDocument();
  },
};

// Cross-field validation: loan amount exceeds 5 times annual income.
export const LoanExceedsIncome: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText('Full Name'), 'Jane Smith');
    await userEvent.type(canvas.getByLabelText('Email'), 'jane@example.com');
    await userEvent.type(canvas.getByLabelText('Annual Income ($)'), '10000');
    await userEvent.type(canvas.getByLabelText('Loan Amount ($)'), '60000');
    await userEvent.click(canvas.getByRole('button', { name: /submit application/i }));

    expect(
      await canvas.findByText('Loan amount cannot exceed 5 times your annual income')
    ).toBeInTheDocument();
  },
};

// MSW delays the POST indefinitely so the button stays in its "Submitting…" state.
export const Submitting: Story = {
  parameters: {
    msw: {
      handlers: {
        loanApplication: [
          http.post(`${API_BASE_URL}/api/v1/applications`, async () => {
            await delay('infinite');
          }),
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    await fillForm(canvasElement);

    await userEvent.click(within(canvasElement).getByRole('button', { name: /submit application/i }));

    expect(await within(canvasElement).findByText('Submitting...')).toBeInTheDocument();
  },
};

// Server rejects a name containing digits/special characters with a 422.
export const WithServerValidationError: Story = {
  parameters: {
    msw: {
      handlers: {
        loanApplication: [
          http.post(`${API_BASE_URL}/api/v1/applications`, () =>
            HttpResponse.json(
              { message: 'Validation failed', errors: { fullName: ['Full name contains invalid characters'] } },
              { status: 422 }
            )
          ),
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText('Full Name'), 'Jane123!');
    await userEvent.type(canvas.getByLabelText('Email'), 'jane@example.com');
    await userEvent.type(canvas.getByLabelText('Annual Income ($)'), '80000');
    await userEvent.type(canvas.getByLabelText('Loan Amount ($)'), '20000');
    await userEvent.click(canvas.getByRole('button', { name: /submit application/i }));

    expect(await canvas.findByText('Full name contains invalid characters')).toBeInTheDocument();
  },
};

// MSW returns a 500 so the mutation fails and the inline error message appears.
export const WithServerError: Story = {
  parameters: {
    msw: {
      handlers: {
        loanApplication: [
          http.post(`${API_BASE_URL}/api/v1/applications`, () =>
            HttpResponse.json(
              { message: 'Internal server error. Please try again later.' },
              { status: 500 }
            )
          ),
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    await fillForm(canvasElement);

    await userEvent.click(within(canvasElement).getByRole('button', { name: /submit application/i }));

    expect(
      await within(canvasElement).findByText(
        (_, el) => el?.textContent?.trim() === 'Internal server error. Please try again later.'
      )
    ).toBeInTheDocument();
  },
};

async function fillForm(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByLabelText('Full Name'), 'Jane Smith');
  await userEvent.type(canvas.getByLabelText('Email'), 'jane@example.com');
  await userEvent.type(canvas.getByLabelText('Annual Income ($)'), '80000');
  await userEvent.type(canvas.getByLabelText('Loan Amount ($)'), '20000');
}
