import type { EntryPoint } from 'react-relay/lib/relay-experimental/EntryPointTypes';
import { EmptyObject } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
const createEntryPoint = <P>(config: EntryPoint<any, P>): EntryPoint<any, P> => ({
  root: config.root,
  getPreloadProps: config.getPreloadProps,
});

export default createEntryPoint;
