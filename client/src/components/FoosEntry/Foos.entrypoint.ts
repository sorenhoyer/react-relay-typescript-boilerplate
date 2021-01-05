import createEntryPoint from '../../createEntryPoint';
import createJSResource from '../../createJSResource';
import { EmptyObject } from '../../types';
import foosQueryConcreteRequest from './__generated__/FoosQuery.graphql';

export default createEntryPoint<EmptyObject>({
  root: createJSResource('Foos', () => import('./Foos')),
  getPreloadProps() {
    return {
      queries: {
        foosQuery: {
          parameters: foosQueryConcreteRequest,
          variables: {},
        },
      },
    };
  },
});
