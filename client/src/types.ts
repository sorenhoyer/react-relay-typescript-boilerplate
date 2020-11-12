import { EntryPoint } from 'react-relay/hooks';

// https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-632749161
type NoElements<T> = { [P in keyof T]: never };

type EmptyObject = NoElements<Record<string, never>>;

type Route = {
  path?: string;
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  entryPoint: EntryPoint<{}, {}>;
  routes: Route[];
};

export type { EmptyObject, NoElements, Route };
