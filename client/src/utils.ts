const nullThrows: <T>(thing: T | null | undefined, message: string) => asserts thing is T = (thing, message) => {
  if (thing == null) {
    throw new Error(message);
  }
};

const toGlobalId = (type: string, id: string): string => btoa([type, id].join(':'));

export { nullThrows, toGlobalId };
