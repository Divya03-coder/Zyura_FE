const TableLoading = () => {
  const loading = new Array(10).fill(null);
  return (
    <div className="w-full flex flex-col items-center justify-center border border-border rounded-md p-4 bg-gray-50 gap-2 my-6">
      {loading.map((_, index) => (
        <div
          key={index}
          className="w-full p-4 rounded-lg bg-gray-100 animate-pulse"
        ></div>
      ))}
    </div>
  );
};
export default TableLoading;
