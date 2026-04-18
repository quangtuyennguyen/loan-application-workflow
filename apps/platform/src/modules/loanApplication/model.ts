export interface LoanApplicationInput {
  fullName: string;
  email: string;
  annualIncome: number;
  loanAmount: number;
}

export type LoanApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface LoanApplicationResponse {
  id: string;
  status: LoanApplicationStatus;
  fullName: string;
  email: string;
  annualIncome: number;
  loanAmount: number;
  createdAt: string;
}
