import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

const app = express();

app.use((req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) res.status(204).end();

  next();
});

app.use(
  '/graphql',
  cors(),
  graphqlHTTP(() => {
    return {
      context: { startTime: Date.now() },
      customFormatErrorFn: (error) => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      }),
      extensions: ({
        // document,
        // variables,
        // operationName,
        // result,
        context,
      }) => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          runTime: Date.now() - (context as any).startTime,
        };
      },
      graphiql: true,
      schema,
    };
  }),
);

app.listen(process.env.GRAPHQL_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started and listening on port ${process.env.GRAPHQL_PORT}`);
});
