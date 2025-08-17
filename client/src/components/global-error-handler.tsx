
import React from 'react';

interface GlobalErrorHandlerProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorHandler extends React.Component<GlobalErrorHandlerProps, ErrorBoundaryState> {
  constructor(props: GlobalErrorHandlerProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Global error caught:', error, errorInfo);
    
    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Error reporting would go here
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-8 text-center rounded-2xl">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎂</div>
              <h1 className="text-2xl font-bold text-neon-cyan mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-300 mb-6">
                Don't worry! Vivaan Bhai's birthday celebration continues! 🎉
              </p>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              🔄 Refresh Page
            </button>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>Party must go on! 🥳</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for handling async errors
export const useErrorHandler = () => {
  return (error: Error) => {
    console.error('Async error:', error);
    // Could trigger a toast notification or other error handling
  };
};

export default GlobalErrorHandler;
