import React, { ReactElement } from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import { FooListItem as FLI } from '../ui-lib';
// eslint-disable-next-line camelcase
import { FooListItem_foo$key } from './__generated__/FooListItem_foo.graphql';

type Props = {
  // eslint-disable-next-line camelcase
  foo: FooListItem_foo$key;
};

const FooListItem = (props: Props): ReactElement => {
  const foo = useFragment(
    graphql`
      fragment FooListItem_foo on Foo {
        uuid
        text
      }
    `,
    // eslint-disable-next-line react/destructuring-assignment
    props.foo,
  );
  return <FLI key={foo.uuid} id={`${foo.uuid}`} text={foo.text} />;
};

export default FooListItem;
