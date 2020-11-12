import { css } from '@emotion/core';
import React, { ReactElement, ReactNode } from 'react';
import { mq } from '../../../utils';

type Props = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const Logo = ({ children, className }: Props): ReactElement => {
  return (
    <section
      className={className}
      css={css`
        display: none;

        ${mq[2]} {
          display: unset;
          grid-area: logo;
          text-align: center;
          padding: 1rem;
          border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.2);
        }
      `}
    >
      {children}
    </section>
  );
};

export default Logo;
