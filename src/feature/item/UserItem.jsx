import React, { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import GetWindowSize from "../../lib/GetWindowSize";

const TimeDifferenceDisplay = React.lazy(() =>
  import(`../../lib/TimeDifferenceDisplay`)
);
const UserItem = ({ items }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { windowSize } = GetWindowSize();

  //end of search

  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div
        style={style}
        key={index}
        className="w-full sm:max-w-lg sm:mx-auto p-2 px-4 mb-2  "
      >
        <div className="border border-blue-700 rounded-md p-2 bg-gray-100 ">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-semibold cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap">
              {item?.itemName}
            </p>
            <p className=" pr-2 font-light">${item?.price}</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <button
              onClick={() => {
                navigate(`/dash/items/${item?.id}`, {
                  state: { pathname: location.pathname },
                });
              }}
              className="bg-gradient-to-r px-6 hover:from-violet-200 hover:to-fuchsia-500 hover:bg-gradient-to-l from-yellow-200 to-rose-400 hover:text-white cursor-pointer  text-center m-3 ml-1 p-1 rounded-md"
            >
              Edit
            </button>
            <Suspense fallback="time display loading..">
              <TimeDifferenceDisplay date={item?.createdAt} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  };

  const dynamicItemWidth = windowSize.width <= 430 ? windowSize.width - 5 : 350;

  return (
    <div className="bg-slate-200 h-screen w-screen">
      <List
        height={windowSize.height || 0}
        itemCount={items?.length || 0}
        itemSize={110}
        width={dynamicItemWidth}
      >
        {Row}
      </List>
    </div>
  );
};

export default React.memo(UserItem);
