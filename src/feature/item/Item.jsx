import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import GetWindowSize from "../../lib/GetWindowSize";
import useToken from "../../hooks/useToken";
import NoImage from "../../img/no-image-available.jpg";
const TimeDifferenceDisplay = React.lazy(() =>
  import(`../../lib/TimeDifferenceDisplay`)
);

const Item = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryState = location?.state;
  const { windowSize } = GetWindowSize();
  const { userId } = useToken();

  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const cateGoryFilterItems = useMemo(() => {
    if (categoryState === "all" || categoryState === null) {
      return items;
    } else {
      return items?.filter((item) => item.category.includes(categoryState));
    }
  }, [categoryState, items?.length]);

  const mapData = useMemo(() => {
    return searchResult.length ? searchResult : cateGoryFilterItems;
  }, [cateGoryFilterItems, searchResult]);

  //search bar
  useEffect(() => {
    if (searchKey && categoryState) {
      const data = cateGoryFilterItems?.filter(
        (item) =>
          item?.itemName
            ?.toLocaleLowerCase()
            ?.includes(searchKey?.toLocaleLowerCase()) ||
          item?.category
            ?.toLocaleLowerCase()
            ?.includes(searchKey?.toLocaleLowerCase()) ||
          item?.subCategory
            ?.toLocaleLowerCase()
            ?.includes(searchKey?.toLocaleLowerCase()) ||
          item?.city
            ?.toLocaleLowerCase()
            ?.includes(searchKey?.toLocaleLowerCase()) ||
          item?.district
            ?.toLocaleLowerCase()
            ?.includes(searchKey?.toLocaleLowerCase()) ||
          item?.province
            ?.toLocaleLowerCase()
            ?.includes(searchKey?.toLocaleLowerCase())
      );
      setSearchResult(data);
    } else {
      setSearchResult([]);
    }
  }, [searchKey]);
  //end of search

  const Row = useMemo(() => {
    return ({ index, style }) => {
      const item = mapData[index];
      return (
        <div
          style={style}
          key={index}
          className="w-full sm:max-w-lg sm:mx-auto p-2 px-4 mb-2  bg-gray-300"
        >
          <div className="bg-white rounded-lg">
            <div className="h-[300px] ">
              <Suspense fallback="image loading">
                <img
                  src={item?.images[0] ? item?.images[0] : NoImage}
                  height={300}
                  alt={`${item?.itemName}`}
                  loading="lazy"
                  className="h-full w-full  rounded-t-lg"
                />
              </Suspense>
            </div>

            <Suspense fallback="time display is loading">
              <div className="pl-2 pt-1 flex flex-row items-center justify-between">
                <TimeDifferenceDisplay date={item?.createdAt} />
                <p className="text-xs italic opacity-60 pr-4 overflow-hidden whitespace-nowrap text-ellipsis">
                  🌍 {item?.city}
                </p>
              </div>
            </Suspense>

            <div className="p-1  m-1 mt-0 rounded-md pl-2 ">
              <div className="flex flex-row items-center justify-between">
                <p className="capitalize text-xl font-semibold cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap">
                  {item?.itemName}
                </p>
                <p className="text-xl pr-2 font-light">${item?.price}</p>
              </div>
              <p className=" font-light text-sm italic">
                {item?.quantity}{" "}
                {`${item?.quantity > 1 ? "availabilities" : "available"}`}
              </p>

              <p className="text-sm font-bold underline underline-page-4">
                Location
              </p>
              <div className="flex flex-row pl-2">
                <p className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                  {item?.province}, {item?.district},{item?.city}
                </p>
              </div>

              <div className="text-md ">
                <p className="text-sm font-bold underline underline-page-4">
                  Contact
                </p>

                <p className="px-2 text-sm font-light whitespace-nowrap text-ellipsis overflow-hidden">
                  {item?.email}, Mobile:{item?.phoneNumber || "not provided"}
                </p>
                <p className="text-sm font-bold underline underline-page-4">
                  Information
                </p>
                <div className="px-2 mr-3 ml-1 font-light max-h-[4rem] min-h-[4rem] overflow-hidden border border-gray-400 rounded-lg p-1 italic">
                  {item?.itemInfo}
                </div>
              </div>

              <div
                onClick={() => {
                  if (userId) {
                    navigate(`/dash/items/${item?.id}/single`);
                  } else if (!userId) {
                    navigate(`/items/${item?.id}/single`);
                  }
                }}
                className="bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:bg-gradient-to-l from-blue-600 to-rose-400 hover:text-white cursor-pointer  text-center m-3 ml-1 p-1 rounded-md"
              >
                Send your interest ?
              </div>
            </div>
          </div>
        </div>
      );
    };
  }, [mapData?.length]);

  const dynamicItemWidth = useMemo(() => {
    return windowSize.width <= 430 ? windowSize.width - 5 : 350;
  }, [windowSize]);

  return (
    <div>
      <div className="bg-black text-white p-1">
        <div className="flex flex-row items-center px-4">
          <input
            maxLength={30}
            placeholder="search..."
            type="search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className={`${
              searchKey ? "w-[50%]" : "w-full"
            } px-4 border border-blue-400 p-1  text-black rounded-full sm:w-auto`}
          />

          {searchResult?.length <= 0 && searchKey && (
            <div className="ml-3">no search match</div>
          )}
          {searchResult?.length >= 1 && searchKey && (
            <div className="ml-3">
              {searchResult?.length}{" "}
              {`${searchResult?.length > 1 ? "results" : "result"}`}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-slate-400">
          <List
            height={windowSize.height || 0}
            itemCount={mapData?.length || 0}
            itemSize={620}
            width={dynamicItemWidth}
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Item);
