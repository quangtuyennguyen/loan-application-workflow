export const defaultParameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  options: {
    storySort: (a: { id: string }, b: { id: string }) =>
      a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }),
  },
};
