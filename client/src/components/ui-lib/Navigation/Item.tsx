import { css } from '@emotion/core';
import React, { ReactElement, ReactNode } from 'react';
import { mq } from '../../../utils';

type Directions = 'top' | 'bottom' | undefined;

export type Props = {
  // eslint-disable-next-line react/require-default-props
  autoMargin?: Directions;
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const Item = ({ autoMargin, children, className }: Props): ReactElement => {
  return (
    <div
      className={className}
      css={css`
        padding: 0.5rem;

        ${mq[2]} {
          ${autoMargin === 'top' && 'margin-top: auto;'}
          ${autoMargin === 'bottom' && 'margin-bottom: auto;'}
        }
      `}
    >
      {children}
    </div>
  );
};

export default Item;
