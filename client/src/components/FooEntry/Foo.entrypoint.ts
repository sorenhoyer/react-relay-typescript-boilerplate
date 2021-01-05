import createEntryPoint from '../../createEntryPoint';
import createJSResource from '../../createJSResource';
import fooQueryConcreteRequest from './__generated__/FooQuery.graphql';
import { toGlobalId } from '../../utils';

export default createEntryPoint<{ id: string }>({
  root: createJSResource('Foo', () => import('./Foo')),
  getPreloadProps(params) {
    return {
      queries: {
        fooQuery: {
          parameters: fooQueryConcreteRequest,
          variables: {
            id: toGlobalId('Foo', params.id),
          },
        },
      },
    };
  },
});
