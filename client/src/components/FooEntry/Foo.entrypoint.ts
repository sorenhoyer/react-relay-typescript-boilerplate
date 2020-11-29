import createEntryPoint from '../../createEntryPoint';
// eslint-disable-next-line import/no-named-as-default
import JSResource from '../../JSResource';
import FooQueryConcreteRequest from './__generated__/FooQuery.graphql';
import { toGlobalId } from '../../utils';

export default createEntryPoint<{ id: string }>({
  root: JSResource<any>('Foo', async () => (await import('./Foo')).default),
  getPreloadProps(params) {
    return {
      queries: {
        fooQuery: {
          parameters: FooQueryConcreteRequest,
          variables: {
            id: toGlobalId('Foo', params.id),
          },
        },
      },
    };
  },
});
