import React, { ReactElement } from 'react';
// eslint-disable-next-line import/no-unresolved
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import Link from '../../routing/Link';
import { ComponentProps } from '../../types';
import { FoosQuery } from './__generated__/FoosQuery.graphql';

type Props = { queries: { foosQuery: PreloadedQuery<FoosQuery> } };

const Foos = ({ queries: { foosQuery } }: ComponentProps<Props>): ReactElement => {
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
        {foos?.map((foo) => (
          <li key={foo?.uuid}>
            <Link to={`/foo/${foo?.uuid}`}>{foo?.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Foos;
