import React, { Suspense } from 'react';
// eslint-disable-next-line import/no-unresolved
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { RootQuery } from './__generated__/RootQuery.graphql';

const Root: React.FC<{ queries: { rootQuery: PreloadedQuery<RootQuery> }; props: { children } }> = ({
  queries: { rootQuery },
  props: { children },
}) => {
  const data = usePreloadedQuery(
    graphql`
      query RootQuery {
        me {
          firstName
        }
      }
    `,
    rootQuery,
  );

  return (
    <div>
      <div>navigation {data.me.firstName}</div>
      <div>
        <Suspense fallback="Loading...">{children}</Suspense>
      </div>
    </div>
  );
};

export default Root;
