// eslint-disable-next-line import/no-unresolved
import type { EntryPoint } from 'react-relay/lib/relay-experimental/EntryPointTypes';

// eslint-disable-next-line @typescript-eslint/ban-types
const createEntryPoint = <P>(config: EntryPoint<P, {}>): EntryPoint<P, {}> => {
  return {
    root: config.root,
    getPreloadProps: config.getPreloadProps,
  };
};

export default createEntryPoint;
