const BigCardSkeleton = () => {
  return (
    <div className="">
      <div className="w-full  bg-white rounded-2xl border border-border   p-6 animate-pulse">
        <div className="">
          <div className="flex flex-col gap-4 py-4  ">
            <div className="w-full flex justify-between gap-2">
              <div className="w-[80%] p-4 rounded-lg bg-gray-100 animate-pulse"></div>
              <div className="flex gap-2 justify-end w-[10%]">
                <div
                  className={`p-4 rounded-lg bg-gray-100 animate-pulse w-full `}
                ></div>
                <div
                  className={`p-4 rounded-lg bg-gray-100 animate-pulse w-full`}
                ></div>
              </div>
            </div>
            <div className="w-[40%] p-4 rounded-lg bg-gray-100 animate-pulse"></div>
            <div className="w-[30%] p-4 rounded-lg bg-gray-100 animate-pulse"></div>
            <div className="ml-auto w-20 p-4 rounded-lg bg-gray-100 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCardSkeleton;
