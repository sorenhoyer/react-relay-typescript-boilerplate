import { css } from '@emotion/core';
import React, { ReactElement, ReactNode } from 'react';
import { mq } from '../../../utils';

type ItemsProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const Items = ({ children, className }: ItemsProps): ReactElement => {
  return (
    <section
      className={className}
      css={css`
        grid-area: items;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (min-width: 768px) {
          justify-content: space-evenly;
        }

        ${mq[2]} {
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 0.5rem;
        }
      `}
    >
      {children}
    </section>
  );
};

export default Items;
