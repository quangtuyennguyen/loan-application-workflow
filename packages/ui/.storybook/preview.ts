import '../src/index.css';

import type { Preview } from '@storybook/react-vite';
import { defaultParameters } from '@tuyennq/storybook-config/preview';

const preview: Preview = {
  parameters: {
    ...defaultParameters,
  },
};

export default preview;
