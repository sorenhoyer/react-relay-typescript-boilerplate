import { BrowserHistoryOptions, createBrowserHistory } from 'history';
import { loadEntryPoint } from 'react-relay/hooks';
import { matchRoutes, MatchedRoute } from 'react-router-config'; // './react-router';
import RelayEnvironment from '../RelayEnvironment';
import { Route } from '../types';

const environmentProvider = {
  getEnvironment() {
    return RelayEnvironment;
  },
};

/**
 * A custom router built from the same primitives as react-router. Each object in `routes`
 * contains both a Component and a prepare() function that can preload data for the component.
 * The router watches for changes to the current location via the `history` package, maps the
 * location to the corresponding route entry, and then preloads the code and data for the route.
 */
const createRouter = (routes: Route[], options?: BrowserHistoryOptions) => {
  // Initialize history
  const history = createBrowserHistory(options);

  // Find the initial match and prepare it
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const initialMatches = matchRoute(routes, history.location);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
  const cleanup = history.listen(({ location, action }) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const matches = matchRoute(routes, location);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const entries = prepareMatches(matches);
    const nextEntry = {
      location,
      entries,
    };
    currentEntry = nextEntry;
    subscribers.forEach((cb) => cb(nextEntry));
  });

  // The actual object that will be passed on the RoutingConext.
  const context = {
    history,
    get() {
      return currentEntry;
    },
    subscribe(cb) {
      // eslint-disable-next-line no-plusplus
      const id = nextId++;
      const dispose = () => {
        subscribers.delete(id);
      };
      subscribers.set(id, cb);
      return dispose;
    },
    preloadCode(pathname) {
      // preload just the code for a route, without storing the result
      const matches = matchRoutes(routes, pathname);
      matches.forEach(({ route }) => (route as any).entryPoint.root.load());
    },
    preload(pathname) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes, pathname);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      prepareMatches(matches);
    },
  };

  return {
    cleanup,
    context,
  };
};

/**
 * Match the current location to the corresponding route entry.
 */
function matchRoute(routes: Route[], location: any) {
  const matchedRoutes = matchRoutes(routes, location.pathname);
  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error(`No route for ${location.pathname}`);
  }
  return matchedRoutes;
}

/**
 * Load the data for the matched route, given the params extracted from the route
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function prepareMatches(matches: MatchedRoute<{}>[]) {
  return matches.map(({ match, route }) => {
    const entryPoint = loadEntryPoint(environmentProvider, route.entryPoint, match.params);
    return { entryPoint, match };
  });
}

export default createRouter;
