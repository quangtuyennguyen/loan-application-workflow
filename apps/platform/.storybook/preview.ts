import '../app/globals.css';

import type { Preview } from '@storybook/nextjs-vite';
import { defaultParameters } from '@tuyennq/storybook-config/preview';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { loanApplicationHandlers } from '../mocks/handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    ...defaultParameters,
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: {
        loanApplication: loanApplicationHandlers,
      },
    },
  },
};

export default preview;
