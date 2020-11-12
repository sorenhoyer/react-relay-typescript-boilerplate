import createEntryPoint from '../../createEntryPoint';
// eslint-disable-next-line import/no-named-as-default
import JSResource from '../../JSResource';
// eslint-disable-next-line import/no-named-as-default
import RootQuery from './__generated__/RootQuery.graphql';

// eslint-disable-next-line @typescript-eslint/ban-types
export default createEntryPoint<{}>({
  // @ts-ignore
  root: JSResource('Root', async () => (await import('./Root')).default),
  // @ts-ignore
  getPreloadProps(params) {
    return {
      queries: {
        rootQuery: {
          parameters: RootQuery,
          variables: {},
        },
      },
    };
  },
});
