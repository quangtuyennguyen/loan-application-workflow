import { queryOptions, useQuery } from '@tanstack/react-query';
import { getLoanApplicationAction } from '@/modules/loanApplication/server/loanApplicationActions';
import { loanApplicationQueryKeys } from '@/modules/loanApplication/loanApplicationQueryKeys';

export const loanApplicationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: loanApplicationQueryKeys.detail(id),
    queryFn: async () => {
      const result = await getLoanApplicationAction(id);
      if ('error' in result) throw new Error(result.error);
      return result;
    },
  });

export function useLoanApplicationQuery(id: string) {
  return useQuery(loanApplicationQueryOptions(id));
}
