export const ApplicationStatus = {
  PENDING: "pending",
  // extend here as the workflow grows: APPROVED, REJECTED, etc.
} as const;

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export interface CreateApplicationInput {
  fullName: string;
  email: string;
  annualIncome: number;
  loanAmount: number;
}

export interface LoanApplication extends CreateApplicationInput {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface CreateApplicationResponse {
  id: string;
  status: ApplicationStatus;
}

export interface ValidationErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}
