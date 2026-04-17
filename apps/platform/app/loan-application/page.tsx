import { LoanApplicationForm } from '@/modules/loanApplication/components/LoanApplicationForm';

export default function LoanApplicationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">Apply for a Loan</h1>
        <LoanApplicationForm />
      </div>
    </main>
  );
}
