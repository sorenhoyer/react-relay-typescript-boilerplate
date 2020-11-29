/* eslint-disable react/destructuring-assignment */
import React, { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;

    return this.props.children;
  }
}
