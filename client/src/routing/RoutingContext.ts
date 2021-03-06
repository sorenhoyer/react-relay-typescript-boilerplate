import { BrowserHistory, State } from 'history';
import React from 'react';
import { RouteEntry } from './types';

type Props = {
  history: BrowserHistory<State>;
  get(): RouteEntry;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(cb: (nextEntry: RouteEntry) => void): () => void;
  preloadCode(pathname: string): void;
  preload(pathname: string): void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const RoutingContext = React.createContext<Props>(undefined!);

export type { Props };

export default RoutingContext;
