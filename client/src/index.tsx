import { css, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import routes from './routes';
import createRouter from './routing/createRouter';
import RouterRenderer from './routing/RouteRenderer';
import RoutingContext from './routing/RoutingContext';
import theme from './themes/dark';
import { nullThrows } from './utils';

const router = createRouter(routes);

const rootNode = document.getElementById('root');

nullThrows<HTMLElement>(rootNode, 'No root node found in DOM');

ReactDOM.unstable_createRoot(rootNode).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          html {
            box-sizing: border-box;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            margin: 0;
            padding: 0;
            font-size: 1rem;
            font-family: Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif;
          }
        `}
      />
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RoutingContext.Provider value={router.context}>
          <RouterRenderer />
        </RoutingContext.Provider>
      </RelayEnvironmentProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
