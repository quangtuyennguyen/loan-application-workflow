import { http, HttpResponse } from 'msw';
import pendingApplication from './responses/loanApplicationPending.json';
import { API_BASE_URL } from '@/lib/config';

export const loanApplicationHandlers = [
  http.get(`${API_BASE_URL}/api/v1/applications/:id`, () => {
    return HttpResponse.json(pendingApplication);
  }),

  http.post(`${API_BASE_URL}/api/v1/applications`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json(
      {
        ...pendingApplication,
        ...body,
        id: `app-${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),
];

export const handlers = [...loanApplicationHandlers];
