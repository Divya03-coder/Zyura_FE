const GlobalLoader = () => {
  return (
    <div className=" flex items-center justify-center mt-20">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Loading text */}
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
