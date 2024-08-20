import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 다음 렌더링에서 fallback UI를 표시합니다.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 에러 리포팅 서비스에 에러를 기록할 수 있습니다.
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // fallback UI를 렌더링합니다.
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
