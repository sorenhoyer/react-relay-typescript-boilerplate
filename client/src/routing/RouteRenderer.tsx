import { css } from '@emotion/core';
import React, { ReactElement, Suspense } from 'react';
import { EntryPointContainer } from 'react-relay/hooks';
import ErrorBoundary from '../components/ErrorBoundary';
import useRouteEntryTransition from './useRouteEntryTransition';

/**
 * A component that accesses the current route entry from RoutingContext and renders
 * that entry.
 */

type Props = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const RouterRenderer = ({ className }: Props): ReactElement => {
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
      <Suspense fallback="Don't show this">
        {/* Indicate to the user that a transition is pending, even while showing the previous UI */}
        {isPending ? (
          <div
            className={className}
            css={css`
              position: absolute;
              z-index: 1;
              background-color: #fff;

              /**
               * Delay the pending indicator in case the transition is very fast:
               * https://reactjs.org/docs/concurrent-mode-patterns.html#delaying-a-pending-indicator
               */

              animation: 0s linear 0.5s forwards makeVisible;
              visibility: hidden;

              @keyframes makeVisible {
                to {
                  visibility: visible;
                }
              }
            `}
          >
            Loading pending...
          </div>
        ) : null}
        {routeComponent}
      </Suspense>
    </ErrorBoundary>
  );
};

export default RouterRenderer;
