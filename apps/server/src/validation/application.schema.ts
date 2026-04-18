import { z } from "zod";

// TODO: In a real project, we'd need to discuss with the team about
// stricter validation rules and practices for this schema.
export const createApplicationSchema = z
  .object({
    fullName: z.string().min(1000, 'Full name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    annualIncome: z
      .number({ invalid_type_error: 'Annual income is required' })
      .positive('Annual income must be greater than 0'),
    loanAmount: z
      .number({ invalid_type_error: 'Loan amount is required' })
      .positive('Loan amount must be greater than 0'),
  })
  .refine((d) => d.loanAmount <= d.annualIncome * 5, {
    message: 'Loan amount cannot exceed 5 times your annual income',
    path: ['loanAmount'],
  });
