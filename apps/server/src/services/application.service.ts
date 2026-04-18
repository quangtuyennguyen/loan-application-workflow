import { randomUUID } from "crypto";

import type { CreateApplicationInput, LoanApplication } from "@/types/application";
import { ApplicationStatus } from "@/types/application";

const applications = new Map<string, LoanApplication>();

export function createApplication(input: CreateApplicationInput): LoanApplication {
  const application: LoanApplication = {
    id: randomUUID(),
    fullName: input.fullName,
    email: input.email,
    annualIncome: input.annualIncome,
    loanAmount: input.loanAmount,
    status: ApplicationStatus.PENDING,
    createdAt: new Date().toISOString(),
  };

  applications.set(application.id, application);

  return application;
}

export function getApplicationById(id: string): LoanApplication | undefined {
  return applications.get(id);
}
