'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@tuyennq/ui/components/button/Button';
import { HookFormInputField } from '@/components/form/HookFormInputField';
import { useSubmitLoanApplicationMutation } from '@/modules/loanApplication/useSubmitLoanApplicationMutation';

const loanSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    annualIncome: z
      .number({ invalid_type_error: 'Annual income is required' })
      .positive('Annual income must be greater than 0'),
    loanAmount: z
      .number({ invalid_type_error: 'Loan amount is required' })
      .positive('Loan amount must be greater than 0'),
  })
  .refine((d) => d.loanAmount <= d.annualIncome * 5, {
    message: 'Loan amount cannot exceed 5× your annual income',
    path: ['loanAmount'],
  });

type LoanSchema = z.infer<typeof loanSchema>;

export function LoanApplicationForm() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useSubmitLoanApplicationMutation();
  const { reset, control, handleSubmit } = useForm<LoanSchema>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      fullName: '',
      email: '',
      annualIncome: undefined,
      loanAmount: undefined,
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (response) => {
        reset();
        router.push(`/loan-application/${response.id}`);
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <HookFormInputField
        control={control}
        name="fullName"
        label="Full Name"
        placeholder="Jane Smith"
        disabled={isPending}
      />
      <HookFormInputField
        control={control}
        name="email"
        label="Email"
        type="email"
        placeholder="jane@example.com"
        disabled={isPending}
      />
      <HookFormInputField
        control={control}
        name="annualIncome"
        label="Annual Income ($)"
        type="number"
        min={0}
        placeholder="50000"
        disabled={isPending}
      />
      <HookFormInputField
        control={control}
        name="loanAmount"
        label="Loan Amount ($)"
        type="number"
        min={0}
        placeholder="10000"
        disabled={isPending}
      />

      {isError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
        className="mt-2 flex items-center justify-center gap-2"
      >
        {isPending && <Spinner />}
        {isPending ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
