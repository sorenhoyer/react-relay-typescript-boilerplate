import { css } from '@emotion/core';
import React, { ReactElement } from 'react';
import { mq } from '../../../utils';
import { Props as ItemProps } from './Item';

type Props = {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  items: ReactElement<ItemProps>;
  logo: ReactElement;
};

const Navigation = ({ className, items, logo }: Props): ReactElement => {
  return (
    <nav
      className={className}
      css={css`
        background-color: #eccc68;
        padding: 0 0.5rem;
        overflow: auto;

        ${mq[2]} {
          display: grid;
          grid-template-rows: max-content auto;
          grid-template-columns: 1fr;
          grid-template-areas: 'logo' 'items';
          padding: 0;
        }
      `}
    >
      {logo}
      {items}
    </nav>
  );
};

export default Navigation;
