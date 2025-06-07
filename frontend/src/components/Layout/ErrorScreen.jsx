function ErrorScreen({ onRetry }) {
    return (
        <div className="retry">
            <h2>Failed to load resources.</h2>
            <p>Please try again later.</p>
            <button onClick={() => onRetry()}>Retry</button>
        </div>
    );
}
export default ErrorScreen;