import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[200px] flex items-center justify-center glass-card rounded-xl p-8 m-4">
          <div className="text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-poppins font-semibold text-neon-gold mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-300 mb-4">
              Don't worry, Vivaan Bhai's party continues! This section will reload automatically.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="bg-gradient-to-r from-neon-cyan to-neon-gold text-dark-primary px-4 py-2 rounded-lg font-medium hover:scale-105 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}