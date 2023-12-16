import React, { useMemo, useEffect, useState } from "react";
import { useGetItemsQuery } from "./itemApiSlice";
import ApiError from "../../lib/ErrorComponent";
import Item from "./Item";
import LoadingComponent from "../../lib/LoadingComponent";
import { useLocation } from "react-router-dom";
const ListItem = () => {
  const history = useLocation();
  // preventing going back
  const handleBack = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    history.pathname.replace("/"); // this will put back home route even after pressing back
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [history.pathname]);

  const { items, isLoading, isSuccess, isError, error } = useGetItemsQuery(
    "listItems",
    {
      selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
        items: data?.ids?.map((id) => data?.entities[id]),
        isSuccess,
        isError,
        isLoading,
        error,
      }),
      pollingInterval: 10000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (
    isError

    // && !items?.length
  ) {
    return <ApiError error={error} />;
  }

  if (isSuccess) {
    return <Item items={items} />;
  }
};

export default ListItem;
