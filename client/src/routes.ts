import FooEntrypoint from './components/FooEntry/Foo.entrypoint';
import FoosEntrypoint from './components/FoosEntry/Foos.entrypoint';
import RootEntryPoint from './components/RootEntry/Root.entrypoint';
import { Route } from './types';

const routes: Route[] = [
  {
    entryPoint: RootEntryPoint,
    routes: [
      {
        path: '/',
        exact: true,
        entryPoint: FoosEntrypoint,
        routes: [],
      },
      {
        path: '/foo/:id',
        exact: true,
        entryPoint: FooEntrypoint,
        routes: [],
      },
    ],
  },
];

export default routes;
