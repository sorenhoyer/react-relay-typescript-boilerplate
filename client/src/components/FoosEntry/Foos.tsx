import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import Link from '../../routing/Link';
import { FoosQuery } from './__generated__/FoosQuery.graphql';

const Foos: React.FC<{ queries: { foosQuery: PreloadedQuery<FoosQuery> } }> = ({ queries: { foosQuery } }) => {
  const data = usePreloadedQuery<FoosQuery>(
    graphql`
      query FoosQuery {
        foos {
          uuid
          text
        }
      }
    `,
    foosQuery,
  );

  const { foos } = data;

  return (
    <div>
      <ul>
        {foos.map((foo) => (
          <li key={foo.uuid}>
            <Link to={`/foo/${foo.uuid}`}>{foo.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Foos;
