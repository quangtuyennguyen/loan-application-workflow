import { useMutation } from '@tanstack/react-query';
import { isApiError } from '@/apiHelpers/apiError';
import { submitLoanApplicationAction } from '@/modules/loanApplication/server/loanApplicationActions';
import type { LoanApplicationInput } from '@/modules/loanApplication/model';

export function useSubmitLoanApplicationMutation() {
  return useMutation({
    mutationFn: async (data: LoanApplicationInput) => {
      const response = await submitLoanApplicationAction(data);
      if (isApiError(response)) {
        throw response;
      }
      return response;
    },
  });
}
