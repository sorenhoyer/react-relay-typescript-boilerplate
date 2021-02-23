import React, { ReactElement, ReactNode, Suspense } from 'react';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import type { ComponentProps } from '../../types';
import { RootQuery } from './__generated__/RootQuery.graphql';

export type Props = { queries: { rootQuery: PreloadedQuery<RootQuery> }; props: { children: ReactNode } };

const Root = ({ queries: { rootQuery }, props: { children } }: Props): ReactElement => {
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
