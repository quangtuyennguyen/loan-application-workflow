'use server';

import { toApiError, type ApiReturnType } from '@/apiHelpers/apiError';
import type { LoanApplicationInput, LoanApplicationResponse } from '@/modules/loanApplication/model';
import { API_BASE_URL } from '@/lib/config';

export async function submitLoanApplicationAction(
  data: LoanApplicationInput
): Promise<ApiReturnType<LoanApplicationResponse>> {
  const res = await fetch(`${API_BASE_URL}/api/v1/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const body = await res.json();

  if (!res.ok) return toApiError(body, res.status);
  return body as LoanApplicationResponse;
}

export async function getLoanApplicationAction(
  id: string
): Promise<ApiReturnType<LoanApplicationResponse>> {
  const res = await fetch(`${API_BASE_URL}/api/v1/applications/${id}`);
  const body = await res.json();

  if (!res.ok) return toApiError(body, res.status);
  return body as LoanApplicationResponse;
}
