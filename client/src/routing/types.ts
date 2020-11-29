import { Location, State } from 'history';
import { match } from 'react-router-dom';

type MatchEntry = {
  entryPoint: never;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: match<any>;
};

type RouteEntry = {
  location: Location<State>;
  entries: MatchEntry[];
};

// eslint-disable-next-line import/prefer-default-export
export type { MatchEntry, RouteEntry };
