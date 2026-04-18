'use server';

import type { LoanApplicationInput, LoanApplicationResponse, ApiError } from '@/modules/loanApplication/model';
import { API_BASE_URL } from '@/lib/config';

export async function submitLoanApplicationAction(
  data: LoanApplicationInput
): Promise<LoanApplicationResponse | ApiError> {
  const res = await fetch(`${API_BASE_URL}/api/v1/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await res.json() as LoanApplicationResponse | { message?: string };

  if (!res.ok) return { error: (body as { message?: string }).message ?? 'Submission failed. Please try again.' };
  return body as LoanApplicationResponse;
}

export async function getLoanApplicationAction(
  id: string
): Promise<LoanApplicationResponse | ApiError> {
  const res = await fetch(`${API_BASE_URL}/api/v1/applications/${id}`);
  const body = await res.json() as LoanApplicationResponse | { message?: string };

  if (!res.ok) return { error: (body as { message?: string }).message ?? 'Application not found.' };
  return body as LoanApplicationResponse;
}
