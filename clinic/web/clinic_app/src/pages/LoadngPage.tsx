
const LoadingPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-base-200">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-base-content font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
