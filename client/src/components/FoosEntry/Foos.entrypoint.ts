import createEntryPoint from '../../createEntryPoint';
// eslint-disable-next-line import/no-named-as-default
import JSResource from '../../JSResource';
import { EmptyObject } from '../../types';
import FoosQueryConcreteRequest from './__generated__/FoosQuery.graphql';

export default createEntryPoint<EmptyObject>({
  root: JSResource<any>('Foos', async () => (await import('./Foos')).default),
  getPreloadProps() {
    return {
      queries: {
        foosQuery: {
          parameters: FoosQueryConcreteRequest,
          variables: {},
        },
      },
    };
  },
});
