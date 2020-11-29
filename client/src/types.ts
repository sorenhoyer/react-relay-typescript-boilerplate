import { EntryPoint } from 'react-relay/hooks';

// https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-632749161
type NoElements<T> = { [P in keyof T]: never };

type EmptyObject = NoElements<Record<string, never>>;

type Route = {
  path?: string;
  exact?: boolean;
  entryPoint: EntryPoint<any, any>;
  routes: Route[];
};

// https://github.com/typescript-cheatsheets/react#consuming-props-of-a-component-with-defaultprops
type ComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;

export type { ComponentProps, EmptyObject, NoElements, Route };
