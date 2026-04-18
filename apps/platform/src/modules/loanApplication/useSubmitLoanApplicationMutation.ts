import { useMutation } from '@tanstack/react-query';
import { submitLoanApplicationAction } from '@/modules/loanApplication/server/loanApplicationActions';
import type { LoanApplicationInput } from '@/modules/loanApplication/model';

export function useSubmitLoanApplicationMutation() {
  return useMutation({
    mutationFn: async (data: LoanApplicationInput) => {
      const result = await submitLoanApplicationAction(data);
      if ('error' in result) throw new Error(result.error);
      return result;
    },
  });
}
