import React, { ReactElement } from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import { FooList as FL /* , FooListItem */ } from '../ui-lib';
import FooListItem from '../FooListItem/FooListItem';
// eslint-disable-next-line camelcase
import { FooList_foos$key } from './__generated__/FooList_foos.graphql';

type Props = {
  // eslint-disable-next-line camelcase
  foos: FooList_foos$key;
};

const FooList = (props: Props): ReactElement => {
  const data = useFragment(
    graphql`
      fragment FooList_foos on Query {
        foos {
          uuid
          ...FooListItem_foo
        }
      }
    `,
    // eslint-disable-next-line react/destructuring-assignment
    props.foos,
  );
  return (
    <FL
      items={data.foos.map((foo) => (
        <FooListItem key={foo.uuid} foo={foo} />
      ))}
    />
  );
};

export default FooList;
