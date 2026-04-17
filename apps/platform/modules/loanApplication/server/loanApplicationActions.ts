'use server';

import type { LoanApplicationInput, LoanApplicationResponse } from '@/modules/loanApplication/model';

const BASE_URL = process.env.LOAN_API_BASE_URL ?? 'http://localhost:3001';

export async function submitLoanApplicationAction(
  data: LoanApplicationInput
): Promise<LoanApplicationResponse | { error: string }> {
  const res = await fetch(`${BASE_URL}/api/v1/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  
  if (!res.ok) return { error: body.message ?? 'Submission failed. Please try again.' };
  return body;
}

export async function getLoanApplicationAction(
  id: string
): Promise<LoanApplicationResponse | { error: string }> {
  const res = await fetch(`${BASE_URL}/api/v1/applications/${id}`, { cache: 'no-store' });
  const body = await res.json();
  
  if (!res.ok) return { error: body.message ?? 'Application not found.' };
  return body;
}
