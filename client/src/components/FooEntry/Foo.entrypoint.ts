import createEntryPoint from '../../createEntryPoint';
// eslint-disable-next-line import/no-named-as-default
import JSResource from '../../JSResource';
// eslint-disable-next-line import/no-named-as-default
import FooQuery from './__generated__/FooQuery.graphql';
import { toGlobalId } from '../../utils';

// eslint-disable-next-line @typescript-eslint/ban-types
export default createEntryPoint<{}>({
  // @ts-ignore
  root: JSResource('Foo', async () => (await import('./Foo')).default),
  // @ts-ignore
  getPreloadProps(params) {
    return {
      queries: {
        fooQuery: {
          parameters: FooQuery,
          variables: {
            id: toGlobalId('Foo', (params as any).id),
          },
        },
      },
    };
  },
});
