import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 text-red-500 p-10 font-sans">
          <h1 className="text-3xl font-bold mb-4 uppercase tracking-wider">Engine Crash Detected</h1>
          <p className="text-white/80 mb-6">The 3D model failed to decode or load.</p>
          <div className="bg-red-500/10 p-6 rounded-lg w-full max-w-2xl border border-red-500/20 overflow-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {this.state.error?.message || 'Unknown Error'}
            </pre>
          </div>
          <p className="text-gray-500 text-xs mt-6">Check the terminal or browser console for more details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
