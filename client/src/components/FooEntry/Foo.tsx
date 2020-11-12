import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { FooQuery } from './__generated__/FooQuery.graphql';

const Foo: React.FC<{ queries: { fooQuery: PreloadedQuery<FooQuery> } }> = ({ queries: { fooQuery } }) => {
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
