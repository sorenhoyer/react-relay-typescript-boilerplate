import { css } from '@emotion/core';
import React, { ReactElement } from 'react';
import Link from '../../routing/Link';

const FooListItem = ({ id, text }: { id: string; text: string }): ReactElement => {
  return (
    <div
      css={css`
        padding: 1rem;
        background: #dfe4ea;
      `}
    >
      <Link to={`/foo/${id}`}>{text}</Link>
    </div>
  );
};

export default FooListItem;
