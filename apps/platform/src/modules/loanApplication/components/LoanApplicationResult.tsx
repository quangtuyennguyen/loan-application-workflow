'use client';

import Link from 'next/link';
import type { LoanApplicationStatus } from '@/modules/loanApplication/model';
import { useLoanApplicationQuery } from '@/modules/loanApplication/useLoanApplicationQuery';

// TODO: These formatters can be moved to packages/libs (shared utilities) and have Jest tests added for them.
const currencyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' });

export function LoanApplicationResult({ id }: { id: string }) {
  const { data, isLoading, isError } = useLoanApplicationQuery(id);

  // TODO: Extract a reusable <Skeleton> component for loading states,
  // so we can apply consistent skeleton styling across the app.
  if (isLoading) {
    return (
      <div className="flex animate-pulse flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div className="h-7 w-48 rounded-md bg-gray-200" />
          <div className="h-6 w-24 rounded-full bg-gray-200" />
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex justify-between gap-4">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="h-4 w-40 rounded bg-gray-200" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="rounded-full bg-red-100 p-3">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium text-gray-900">Application not found</p>
          <p className="mt-1 text-sm text-gray-500">
            A server error occurred or the application ID is invalid. Please try again later.
          </p>
        </div>
        <Link href="/loan-application" className="text-sm text-gray-500 underline hover:text-gray-700">
          ← Submit a new application
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 break-all text-lg font-semibold text-gray-900">Application #…{data.id.slice(-6)}</h2>
        <StatusBadge status={data.status} />
      </div>

      <dl className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5">
        <Row label="Application ID" value={data.id} />
        <Row label="Full Name" value={data.fullName} />
        <Row label="Email" value={data.email} />
        <Row label="Annual Income" value={currencyFmt.format(data.annualIncome)} />
        <Row label="Loan Amount" value={currencyFmt.format(data.loanAmount)} />
        <Row label="Submitted" value={dateFmt.format(new Date(data.createdAt))} />
      </dl>

      <Link href="/loan-application" className="text-sm text-gray-500 underline hover:text-gray-700">
        ← Submit another application
      </Link>
    </div>
  );
}

const statusStyles = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
} as const;

const statusLabels = {
  pending: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
} as const;

// TODO: This StatusBadge component can be enhanced and moved to @tuyennq/ui as a separate reusable component.
function StatusBadge({ status }: { status: LoanApplicationStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="font-medium text-gray-500">{label}</dt>
      <dd className="text-gray-900">{value}</dd>
    </div>
  );
}
