import React, { useCallback, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
const ImageSlider = ({ item }) => {
  const length = item?.images?.length;
  const [index, setIndex] = useState(0);

  const handleIndexChanged = useCallback(() => {
    if (index === length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  }, [index]);

  const handleIndexChangedBackWard = useCallback(() => {
    if (index === 0) {
      setIndex(length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  }, [index]);

  return (
    <>
      <>
        <div className="relative ">
          <div className="h-[300px] flex items-center justify-center ">
            <img
              src={item?.images[index]}
              alt=""
              loading="lazy"
              className="h-full w-full"
            />
          </div>
          {length > 1 && (
            <div className="flex flex-row items-center justify-center absolute bottom-5  left-0 right-0 ">
              <button
                className="h-6 w-6 m-2 flex items-center justify-center border border-gray-300 bg-slate-200 hover:text-white hover:bg-green-700 rounded-full"
                onClick={handleIndexChangedBackWard}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              <button
                className="h-6 w-6 m-2 flex items-center justify-center border border-gray-300 bg-slate-200 hover:text-white hover:bg-green-700 rounded-full"
                onClick={handleIndexChanged}
              >
                <ChevronRightIcon className="h-5 w-6" />
              </button>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default React.memo(ImageSlider);
