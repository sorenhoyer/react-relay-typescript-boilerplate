import createEntryPoint from '../../createEntryPoint';
// eslint-disable-next-line import/no-named-as-default
import JSResource from '../../JSResource';
import { EmptyObject } from '../../types';
import RootQueryConcreteRequest from './__generated__/RootQuery.graphql';

export default createEntryPoint<EmptyObject>({
  root: JSResource<any>('Root', async () => (await import('./Root')).default),
  getPreloadProps() {
    return {
      queries: {
        rootQuery: {
          parameters: RootQueryConcreteRequest,
          variables: {},
        },
      },
    };
  },
});
