import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
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
        console.error("Uncaught error:", error, errorInfo);
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="p-4 bg-red-900 text-white font-mono h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">CRITICAL SYSTEM FAILURE</h1>
                    <p className="mb-2">An error occurred in the boot sequence.</p>
                    <div className="bg-black p-4 rounded text-xs overflow-auto max-w-full">
                        <p className="text-red-400 font-bold">{this.state.error?.toString()}</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
