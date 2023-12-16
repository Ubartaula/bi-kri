import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "./itemApiSlice";
import ImageSlider from "../../lib/ImageSlider";
import NoImage from "../../img/no-image-available.jpg";
//import AddComment from "../comment/AddComment";

const AddComment = React.lazy(() => import(`../comment/AddComment`));

const TimeDifferenceDisplay = React.lazy(() =>
  import(`../../lib/TimeDifferenceDisplay`)
);

const IndividualItem = () => {
  const { id } = useParams();

  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[id],
    }),
  });

  return (
    <div className="bg-gray-300 p-2 w-full mx-auto max-w-lg min-h-screen px-4">
      <div className=" bg-white rounded-lg px-2">
        <Suspense fallback="image slider loading...">
          <div className=" p-1 ">
            {item?.images?.length ? (
              <ImageSlider item={item} showPagination={true} />
            ) : (
              <img
                src={NoImage}
                height={300}
                width={300}
                alt={`${item?.itemName}`}
                className="p-2 "
              />
            )}
          </div>
        </Suspense>

        <div className=" xsm:pl-3 p-2 rounded-md">
          <>
            <div className="flex flex-row items-center justify-between">
              <Suspense fallback="time component running...">
                <TimeDifferenceDisplay date={item?.createdAt} />
              </Suspense>

              <p className="pr-2 italic text-sm">
                <span className="pr-1 text-sm">🌎</span>
                {item?.district}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between text-lg font-bold">
              <p className=" capitalize max-w-[60%] text-ellipsis overflow-hidden whitespace-nowrap ">
                {" "}
                {item?.itemName}
              </p>
              <p className="pr-2 ">Rs {item?.price}</p>
            </div>

            <p className=" italic text-sm">
              {item?.quantity}{" "}
              {`${item?.quantity > 1 ? "availabilities" : "available"}`}
            </p>

            <div className="">
              <p className="font-semibold text-sm mt-1">Location</p>
              <div className="flex flex-row items-start justify-normal pl-2 text-sm italic">
                <p className="pr-1 ">{item?.province},</p>
                <p className="pr-1 ">{item?.district},</p>
                <p className="pr-1 ">{item?.city}</p>
              </div>

              <p className=" font-semibold text-sm mt-1">Contact</p>
              <p className="px-2 italic text-sm ">
                Mobile: {item?.phoneNumber}
              </p>
              <p className="pl-2 italic  whitespace-nowrap text-ellipsis overflow-hidden">
                {item?.email}
              </p>

              <p className=" font-semibold text-sm mt-1">Description</p>
              <div className="w-full mb-1 italic border border-gray-200 opacity-80 rounded-lg p-1">
                {item?.itemInfo}
              </div>
            </div>

            <Suspense fallback="posting comments...">
              <AddComment itemId={item?.id} />
            </Suspense>
          </>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default IndividualItem;
