import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import routes from './routes';
import createRouter from './routing/createRouter';
import RouterRenderer from './routing/RouteRenderer';
import RoutingContext from './routing/RoutingContext';
import { nullThrows } from './utils';

const router = createRouter(routes);

const rootNode = document.getElementById('root');

nullThrows<HTMLElement>(rootNode, 'No root node found in DOM');

ReactDOM.unstable_createRoot(rootNode).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <RoutingContext.Provider value={router.context}>
        <RouterRenderer />
      </RoutingContext.Provider>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
);
