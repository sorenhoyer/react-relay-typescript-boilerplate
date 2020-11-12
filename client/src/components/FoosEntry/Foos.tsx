import React, { ReactElement } from 'react';
// eslint-disable-next-line import/no-unresolved
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { FoosQuery } from './__generated__/FoosQuery.graphql';
import { FooCounts, /* FooList, FooListItem, */ FooListView } from '../ui-lib';
import FooList from '../FooList/FooList';

type Props = { queries: { foosQuery: PreloadedQuery<FoosQuery> } };

const Foos = ({ queries: { foosQuery } }: Props): ReactElement => {
  const data = usePreloadedQuery<FoosQuery>(
    graphql`
      query FoosQuery {
        foos {
          uuid
          text
        }
        # ...FooCounts_totalCount
        ...FooList_foos
      }
    `,
    foosQuery,
  );

  const { foos } = data;

  return (
    <div>
      <FooListView counts={<FooCounts count={foos.length} />} list={<FooList foos={data} />} />
    </div>
    // <div>
    //   <FooListView
    //     counts={<FooCounts count={foos.length} />}
    //     list={
    //       <FooList
    //         items={foos.map((foo) => (
    //           <FooListItem key={foo.uuid} id={`/foo/${foo.uuid}`} text={foo.text} />
    //         ))}
    //       />
    //     }
    //   />
    // </div>
  );
};

export default Foos;
