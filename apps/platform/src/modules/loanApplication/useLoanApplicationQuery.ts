import { queryOptions, useQuery } from '@tanstack/react-query';
import { isApiError } from '@/apiHelpers/apiError';
import { getLoanApplicationAction } from '@/modules/loanApplication/server/loanApplicationActions';
import { loanApplicationQueryKeys } from '@/modules/loanApplication/loanApplicationQueryKeys';

export const loanApplicationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: loanApplicationQueryKeys.detail(id),
    queryFn: async () => {
      const result = await getLoanApplicationAction(id);
      if (isApiError(result)) throw new Error(result.message);
      return result;
    },
    enabled: !!id,
  });

export function useLoanApplicationQuery(id: string) {
  return useQuery(loanApplicationQueryOptions(id));
}
