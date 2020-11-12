import { css } from '@emotion/core';
import React, { ReactElement, Suspense } from 'react';
// eslint-disable-next-line import/no-unresolved
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks';
import { mq } from '../../utils';
import { Item, Items, Logo, Navigation } from '../ui-lib/Navigation';
import { RootQuery } from './__generated__/RootQuery.graphql';

type Props = { queries: { rootQuery: PreloadedQuery<RootQuery> }; props: { children } };

const Root = ({ queries: { rootQuery }, props: { children } }: Props): ReactElement => {
  const data = usePreloadedQuery(
    graphql`
      query RootQuery {
        me {
          firstName
        }
      }
    `,
    rootQuery,
  );

  return (
    <div
      css={css`
        display: grid;
        grid-template-areas: 'main' 'nav';
        grid-template-rows: auto 4rem;
        height: 100%;
        width: 100%;

        ${mq[2]} {
          grid-template-rows: unset;
          grid-template-areas: 'nav main';
          grid-template-columns: 10rem auto;
        }
      `}
    >
      <Navigation
        css={css`
          grid-area: nav;
        `}
        logo={
          <Logo>
            <div>{data.me.firstName}</div>
          </Logo>
        }
        items={
          <Items>
            <Item>dfdsfd</Item>
            <Item>dfdsfd</Item>
            <Item>dfdsfd</Item>
            <Item>dfdsfd</Item>
            <Item autoMargin="top">dfgdfgd</Item>
            <Item>dfdsfd</Item>
            <Item>dfdsfd</Item>
          </Items>
        }
      />
      <div
        css={css`
          grid-area: main;
          padding: 1rem;
        `}
      >
        <Suspense fallback="Loading...">{children}</Suspense>
      </div>
    </div>
  );
};

export default Root;
