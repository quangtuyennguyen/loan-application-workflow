'use client';

import type { LoanApplicationStatus } from '@/modules/loanApplication/model';
import { useLoanApplicationQuery } from '@/modules/loanApplication/useLoanApplicationQuery';

const currencyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' });

export function LoanApplicationResult({ id }: { id: string }) {
  const { data, isLoading, isError } = useLoanApplicationQuery(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 animate-pulse rounded-md bg-gray-200" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Application not found. The ID may be invalid or the server may be unavailable.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Application #{data.id}</h2>
        <StatusBadge status={data.status} />
      </div>

      <dl className="flex flex-col gap-4 rounded-lg border border-gray-200 p-5">
        <Row label="Full Name" value={data.fullName} />
        <Row label="Email" value={data.email} />
        <Row label="Annual Income" value={currencyFmt.format(data.annualIncome)} />
        <Row label="Loan Amount" value={currencyFmt.format(data.loanAmount)} />
        <Row label="Submitted" value={dateFmt.format(new Date(data.createdAt))} />
      </dl>

      <a href="/loan-application" className="text-sm text-gray-500 underline hover:text-gray-700">
        ← Submit another application
      </a>
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

function StatusBadge({ status }: { status: LoanApplicationStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}>
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
