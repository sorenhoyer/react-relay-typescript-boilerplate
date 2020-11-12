import { promisify } from 'util';

const sleep = promisify(setTimeout);

// eslint-disable-next-line import/prefer-default-export
export { sleep };
