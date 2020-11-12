// eslint-disable-next-line import/no-named-as-default
import createEntryPoint from '../../createEntryPoint';
// eslint-disable-next-line import/no-named-as-default
import JSResource from '../../JSResource';
// eslint-disable-next-line import/no-named-as-default
import FoosQuery from './__generated__/FoosQuery.graphql';

// eslint-disable-next-line @typescript-eslint/ban-types
export default createEntryPoint<{}>({
  // @ts-ignore
  root: JSResource('Foos', async () => (await import('./Foos')).default),
  // @ts-ignore
  getPreloadProps(params) {
    return {
      queries: {
        foosQuery: {
          parameters: FoosQuery,
          variables: {},
        },
      },
    };
  },
});
