import React from "react";
import { useGetUsersQuery } from "./userApiSlice";
import LoadingComponent from "../../lib/LoadingComponent";
import ErrorComponent from "../../lib/ErrorComponent";
import User from "./User";

const ListUser = () => {
  const { users, isLoading, isError, error, isSuccess } = useGetUsersQuery(
    "listUsers",
    {
      selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
        users: data?.ids?.map((id) => data?.entities[id]),
        isLoading,
        isSuccess,
        isError,
        error,
      }),
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (isSuccess) {
    return <User users={users} />;
  }
};

export default ListUser;
