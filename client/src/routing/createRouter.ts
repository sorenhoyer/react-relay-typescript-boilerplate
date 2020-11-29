import { BrowserHistoryOptions, createBrowserHistory } from 'history';
import { loadEntryPoint } from 'react-relay/hooks';
import { matchRoutes, MatchedRoute } from 'react-router-config'; // './react-router';
import RelayEnvironment from '../RelayEnvironment';
import { EmptyObject, Route } from '../types';
import { Props as Context } from './RoutingContext';

type Router = {
  cleanup: () => void;
  context: Context;
};

/**
 * Match the current location to the corresponding route entry.
 */
const matchRoute = (routes: Route[], location: any) => {
  const matchedRoutes = matchRoutes(routes, location.pathname);

  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error(`No route for ${location.pathname}`);
  }

  return matchedRoutes;
};

const environmentProvider = {
  getEnvironment() {
    return RelayEnvironment;
  },
};

/**
 * Load the data for the matched route, given the params extracted from the route
 */
const prepareMatches = (matches: MatchedRoute<any>[]) => {
  return matches.map(({ match, route }) => {
    const entryPoint = loadEntryPoint(environmentProvider, route.entryPoint, match.params);

    return { entryPoint, match };
  });
};

/**
 * A custom router built from the same primitives as react-router. Each object in `routes`
 * contains both a Component and entryPoint that can preload data for the component.
 * The router watches for changes to the current location via the `history` package, maps the
 * location to the corresponding route entry, and then preloads the code and data for the route.
 */
const createRouter = (routes: Route[], options?: BrowserHistoryOptions): Router => {
  // Initialize history
  const history = createBrowserHistory(options);

  // Find the initial match and prepare it
  const initialMatches = matchRoute(routes, history.location);

  const initialEntries = prepareMatches(initialMatches);

  let currentEntry = {
    location: history.location,
    entries: initialEntries,
  };

  // maintain a set of subscribers to the active entry
  let nextId = 0;

  const subscribers = new Map();

  // Listen for location changes, match to the route entry, prepare the entry,
  // and notify subscribers. Note that this pattern ensures that data-loading
  // occurs *outside* of - and *before* - rendering.
  const cleanup = history.listen(({ location }) => {
    const matches = matchRoute(routes, location);

    const entries = prepareMatches(matches);

    const nextEntry = {
      location,
      entries,
    };

    currentEntry = nextEntry;

    subscribers.forEach((cb) => cb(nextEntry));
  });

  // The actual object that will be passed on the RoutingConext.
  const context: Context = {
    history,
    get() {
      return currentEntry;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe(cb: (nextEntry: any) => void) {
      // eslint-disable-next-line no-plusplus
      const id = nextId++;

      const dispose = () => {
        subscribers.delete(id);
      };

      subscribers.set(id, cb);

      return dispose;
    },
    preloadCode(pathname: string) {
      // preload just the code for a route, without storing the result
      const matches = matchRoutes(routes, pathname);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      matches.forEach(({ route }) => (route as any).entryPoint.root.load());
    },
    preload(pathname: string) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes, pathname);

      prepareMatches(matches);
    },
  };

  return {
    cleanup,
    context,
  };
};

export default createRouter;
