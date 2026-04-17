import { LoanApplicationResult } from '@/modules/loanApplication/components/LoanApplicationResult';

export default async function LoanApplicationResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">Application Status</h1>
        <LoanApplicationResult id={id} />
      </div>
    </main>
  );
}
