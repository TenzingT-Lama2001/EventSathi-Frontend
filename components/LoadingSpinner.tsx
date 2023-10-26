const LoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-solid border-blue-500">
        {/* You can adjust the size, border color, and animation speed */}
      </div>
    </div>
  );
};

export default LoadingSpinner;
