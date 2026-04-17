export const loanApplicationQueryKeys = {
  base: ['loanApplication'] as const,
  detail: (id: string) => [...loanApplicationQueryKeys.base, id] as const,
};
