import { css } from '@emotion/core';
import React, { ReactElement, ReactNode } from 'react';

const FooList = ({ items }: { items: ReactNode }): ReactElement => {
  return (
    <div
      css={css`
        display: grid;
        grid-auto-rows: max-content;
        grid-row-gap: 1rem;
      `}
    >
      {items}
    </div>
  );
};

export default FooList;
