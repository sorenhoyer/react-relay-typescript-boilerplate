import React, { ReactElement } from 'react';
// eslint-disable-next-line import/no-unresolved
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { FooQuery } from './__generated__/FooQuery.graphql';

type Props = { queries: { fooQuery: PreloadedQuery<FooQuery> } };

const Foo = ({ queries: { fooQuery } }: Props): ReactElement => {
  const data = usePreloadedQuery<FooQuery>(
    graphql`
      query FooQuery($id: ID!) {
        node(id: $id) {
          ... on Foo {
            id
            text
          }
        }
      }
    `,
    fooQuery,
  );

  const { node } = data;

  return <div>{node.text}</div>;
};

export default Foo;
