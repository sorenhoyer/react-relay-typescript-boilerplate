// eslint-disable-next-line camelcase
import { unstable_useTransition, useContext, useEffect, useState } from 'react';
import RoutingContext from './RoutingContext';
import { RouteEntry } from './types';

const useRouteEntryTransition = (): { routeEntry: RouteEntry; isPending: boolean } => {
  const router = useContext(RoutingContext);

  // Improve the route transition UX by delaying transitions: show the previous route entry
  // for a brief period while the next route is being prepared. See
  // https://reactjs.org/docs/concurrent-mode-patterns.html#transitions
  const [startTransition, isPending] = unstable_useTransition();

  // Store the active entry in state - this allows the renderer to use features like
  // unstable_useTransition to delay when state changes become visible to the user.
  const [routeEntry, setRouteEntry] = useState(router.get());

  // On mount subscribe for route changes
  useEffect(() => {
    // Check if the route has changed between the last render and commit:
    const currentEntry = router.get();

    if (currentEntry !== routeEntry) {
      // If there was a concurrent modification, rerender and exit
      setRouteEntry(currentEntry);
      return;
    }

    // If there *wasn't* a concurrent change to the route, then the UI
    // is current: subscribe for subsequent route updates
    const dispose = router.subscribe((nextEntry: RouteEntry) => {
      // startTransition() delays the effect of the setRouteEntry (setState) call
      // for a brief period, continuing to show the old state while the new
      // state (route) is prepared.
      startTransition(() => {
        setRouteEntry(nextEntry);
      });
    });

    return () => dispose();

    // Note: this hook updates routeEntry manually; we exclude that variable
    // from the hook deps to avoid recomputing the effect after each change
    // triggered by the effect itself.
    // eslint-disable-next-line
  }, [router, startTransition]);

  return { routeEntry, isPending };
};

export default useRouteEntryTransition;
