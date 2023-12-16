import React, { useState, useEffect, useMemo } from "react";
import useToken from "../../hooks/useToken";
import { useGetItemsQuery } from "./itemApiSlice";
import LoadingComponent from "../../lib/LoadingComponent";
import UserItem from "./UserItem";

const UserListItem = () => {
  const { items, isLoading } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data, isSuccess, isLoading }) => ({
      items: data?.ids?.map((id) => data?.entities[id]),
      isSuccess,
      isLoading,
    }),
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { userId, firstName, lastName } = useToken();

  const userItems = useMemo(() => {
    return items?.filter(
      (item) => item?.user?._id?.toString() === userId?.toString()
    );
  }, [userId, isLoading]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div
        className={`flex flex-row items-center justify-between bg-sky-600 p-1`}
      >
        <div
          className={` max-w-[50%] bg-yellow-100 text-xs text-black rounded-full ml-4`}
        >
          <p className="p-1  capitalize overflow-hidden text-ellipsis whitespace-nowrap px-2 ">{`Hello Mr. ${lastName}, ${firstName} !`}</p>
        </div>

        <div className=" p-1 rounded-full px-2 text-xs bg-yellow-100 text-black mr-4">
          You have total {userItems?.length || 0}{" "}
          {`${userItems?.length <= 1 ? "item" : "items"}`}
        </div>
      </div>
      {userItems?.length ? (
        <UserItem items={userItems} />
      ) : (
        <div className=" p-6 h-screen text-blue-600 bg-white text-xl text-center">
          You do not have any post till now.
        </div>
      )}
    </>
  );
};

export default UserListItem;
