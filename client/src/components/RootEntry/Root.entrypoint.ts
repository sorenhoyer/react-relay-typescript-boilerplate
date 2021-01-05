import createEntryPoint from '../../createEntryPoint';
import createJSResource from '../../createJSResource';
import { EmptyObject } from '../../types';
import rootQueryConcreteRequest from './__generated__/RootQuery.graphql';

export default createEntryPoint<EmptyObject>({
  root: createJSResource('Root', () => import('./Root')),
  getPreloadProps() {
    return {
      queries: {
        rootQuery: {
          parameters: rootQueryConcreteRequest,
          variables: {},
        },
      },
    };
  },
});
