import React, { ReactElement } from 'react';

const FooCounts = ({ count }: { count: string | number }): ReactElement => {
  return <div>Foo count: {count}</div>;
};

export default FooCounts;
