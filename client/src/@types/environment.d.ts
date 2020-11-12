declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      REACT_RELAY_TYPESCRIPT_BOILERPLATE_GRAPHQL_ENDPOINT: string;
      REACT_RELAY_TYPESCRIPT_BOILERPLATE_PORT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
