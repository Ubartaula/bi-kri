import React from "react";
import { FixedSizeList as List } from "react-window";
import { useNavigate } from "react-router-dom";
import GetWindowSize from "../../lib/GetWindowSize";

const User = ({ users }) => {
  const navigate = useNavigate();
  const { windowSize } = GetWindowSize();

  // react-window

  const Row = ({ index, style }) => {
    /// get any if you want here
    const user = users[index];
    const status = user?.isActive ? "Active" : "Inactive";

    return (
      <div style={style} className="flex flex-row items-center m-1 p-2 pr-4  ">
        <p className="p-2 w-[8rem] min-w-[8rem] whitespace-nowrap text-ellipsis overflow-hidden">
          {user.firstName}
        </p>
        <p className="p-2 w-[8rem] min-w-[8rem] whitespace-nowrap text-ellipsis overflow-hidden">
          {user.lastName}
        </p>

        <p className="p-2 w-[13rem] min-w-[13rem] text-ellipsis overflow-hidden">
          {user.email}
        </p>
        <p className="p-2 w-[8rem] min-w-[8rem]">{status}</p>
        <p className="p-2 w-[8rem] min-w-[8rem]">{user.role}</p>

        <button
          onClick={() => navigate(`/dash/users/${user?._id}`)}
          className="bg-blue-500 text-white px-2 rounded-lg w-[4rem]"
        >
          Edit
        </button>

        <p className="p-2 w-[8rem] min-w-[8rem] whitespace-nowrap text-ellipsis overflow-hidden">
          {user.phoneNumber}
        </p>
      </div>
    );
  };

  return (
    <div className="min-w-full h-full">
      <div className="p-2">
        <button
          onClick={() => navigate("/dash/users/new")}
          className="bg-blue-600 hover:bg-green-600 rounded-lg text-white p-2 px-3 min-w-[8rem]"
        >
          Create New User
        </button>
      </div>
      <h1 className="text-bold/30 p-2 underline-offset-4 underline">
        List of Users
      </h1>

      <div className="w-full">
        <List
          height={windowSize.height || 0}
          itemCount={users?.length || 0}
          itemSize={30}
          layout="vertical"
          width={"100%"}
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default React.memo(User);
