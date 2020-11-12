import React, { ReactElement, Suspense } from 'react';
import { EntryPointContainer } from 'react-relay/hooks';
import ErrorBoundary from '../components/ErrorBoundary';
import useRouteEntryTransition from './useRouteEntryTransition';

/**
 * A component that accesses the current route entry from RoutingContext and renders
 * that entry.
 */

const RouterRenderer = (): ReactElement => {
  // const router = useContext(RoutingContext);

  // const routeEntry = router.get();

  // Optional:
  // Improve the route transition UX by delaying transitions: show the previous route entry
  // for a brief period while the next route is being prepared. See
  // https://reactjs.org/docs/concurrent-mode-patterns.html#transitions
  const { routeEntry, isPending } = useRouteEntryTransition();

  const reversedEntries = [].concat(routeEntry.entries).reverse();

  const firstEntry = reversedEntries[0];
  // the bottom-most component is special since it will have no children

  // @ts-ignore
  let routeComponent = <EntryPointContainer entryPointReference={firstEntry.entryPoint} props={{}} />;
  // eslint-disable-next-line no-plusplus
  for (let ii = 1; ii < reversedEntries.length; ii++) {
    const nextEntry = reversedEntries[ii];
    routeComponent = (
      // @ts-ignore
      <EntryPointContainer entryPointReference={nextEntry.entryPoint} props={{ children: routeComponent }} />
    );
  }

  return (
    <ErrorBoundary renderError={() => 'Error'}>
      <Suspense fallback="Loading fallback...">
        {/* Indicate to the user that a transition is pending, even while showing the previous UI */}
        {isPending ? <div className="RouteRenderer-pending">Loading pending...</div> : null}
        {routeComponent}
      </Suspense>
    </ErrorBoundary>
  );
};

export default RouterRenderer;
