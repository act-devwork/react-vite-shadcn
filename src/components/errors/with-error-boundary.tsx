import React, { Component, type ErrorInfo } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

interface State {
  hasError: boolean;
}

const withErrorBoundary = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class ErrorBoundary extends Component<P, State> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    handleRetry = () => {
      this.setState({ hasError: false });
    };

    render() {
      if (this.state.hasError) {
        return (
          <div className="flex flex-col items-center justify-center h-dvh">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              We are sorry for the inconvenience. Please try again later.
            </p>
            <Link to="/">
              <Button className="mt-6">
                Go to home
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorBoundary;
