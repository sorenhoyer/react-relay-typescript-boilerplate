const nullThrows: <T>(thing: T | null | undefined, message: string) => asserts thing is T = (thing, message) => {
  if (thing == null) {
    throw new Error(message);
  }
};

const toGlobalId = (type: string, id: string): string => {
  return btoa([type, id].join(':'));
};

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export { mq, nullThrows, toGlobalId };
