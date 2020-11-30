import React, { ReactElement, Suspense } from 'react';
import { EntryPointContainer } from 'react-relay/hooks';
import ErrorBoundary from '../components/ErrorBoundary';
import { MatchEntry } from './types';
import useRouteEntryTransition from './useRouteEntryTransition';

/**
 * A component that accesses the current route entry from RoutingContext and renders
 * that entry.
 */

const RouterRenderer = (): ReactElement => {
  // const router = useContext(RoutingContext);

  // const routeEntry = router.get();

  // Improve the route transition UX by delaying transitions: show the previous route entry
  // for a brief period while the next route is being prepared. See
  // https://reactjs.org/docs/concurrent-mode-patterns.html#transitions
  const { routeEntry, isPending } = useRouteEntryTransition();

  const reversedEntries = ([] as MatchEntry[]).concat(routeEntry.entries).reverse();

  const [firstEntry, ...rest] = reversedEntries;

  // The bottom-most component is special since it will have no children
  let routeComponent = <EntryPointContainer entryPointReference={firstEntry.entryPoint} props={{} as never} />;

  rest.forEach((nextEntry) => {
    routeComponent = (
      <EntryPointContainer entryPointReference={nextEntry.entryPoint} props={{ children: routeComponent } as never} />
    );
  });

  return (
    <ErrorBoundary>
      <Suspense fallback="Loading fallback...">
        {/* Indicate to the user that a transition is pending, even while showing the previous UI */}
        {isPending ? <div className="RouteRenderer-pending">Loading pending...</div> : null}

        {routeComponent}
      </Suspense>
    </ErrorBoundary>
  );
};

export default RouterRenderer;
