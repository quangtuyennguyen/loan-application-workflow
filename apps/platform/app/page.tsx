import Link from 'next/link';
import { Button } from '@tuyennq/ui/src/components/button/Button';

const steps = [
  { step: '1', title: 'Fill in your details', description: 'Provide your name, email, annual income, and desired loan amount.' },
  { step: '2', title: 'Submit your application', description: 'Your application is validated and sent for review instantly.' },
  { step: '3', title: 'Track your status', description: 'View your application status — pending, approved, or rejected.' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Loan Application</h1>
          <p className="mt-3 text-base text-gray-500">
            A simple, fast workflow to submit and track your personal loan application.
          </p>
        </div>

        <ol className="mb-10 flex flex-col gap-4">
          {steps.map(({ step, title, description }) => (
            <li key={step} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                {step}
              </span>
              <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="mt-0.5 text-sm text-gray-500">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="text-center">
          <Button render={<Link href="/loan-application" />}>
            Start your application
          </Button>
        </div>
      </div>
    </main>
  );
}
