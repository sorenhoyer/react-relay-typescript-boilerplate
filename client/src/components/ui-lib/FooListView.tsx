import { css } from '@emotion/core';
import React, { ReactElement, ReactNode } from 'react';

const FooListView = ({ counts, list }: { counts: ReactElement; list: ReactNode }): ReactElement => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-area: 'counts list';
        grid-row-gap: 1rem;
      `}
    >
      <div
        css={css`
          grid-area: 'counts';
        `}
      >
        {counts}
      </div>
      <div
        css={css`
          grid-area: 'list';
        `}
      >
        {list}
      </div>
    </div>
  );
};

export default FooListView;
