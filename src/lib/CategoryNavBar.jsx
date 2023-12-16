import React from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const CategoryNavBar = ({ setShowCategory }) => {
  const navigate = useNavigate();

  const { userId } = useToken();
  return (
    <>
      {/* for mobile */}
      <div className="flex-col fixed top-[3rem] z-50 left-0 rounded-e-md p-2 px-4 bg-gradient-to-r from-purple-400 to-cyan-600">
        <div
          onClick={() => {
            if (userId) {
              navigate("/dash");
            } else if (!userId) {
              navigate("/");
            }
            setShowCategory((prev) => !prev);
          }}
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
        >
          Home
        </div>

        <div
          onClick={() => {
            if (userId) {
              navigate("/dash/items", {
                state: "all",
              });
            } else if (!userId) {
              navigate("/items", {
                state: "all",
              });
            }
            setShowCategory((prev) => !prev);
          }}
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
        >
          All List
        </div>
        <div
          onClick={() => {
            if (userId) {
              navigate("/dash/items", {
                state: "housing",
              });
            } else if (!userId) {
              navigate("/items", {
                state: "housing",
              });
            }
            setShowCategory((prev) => !prev);
          }}
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
        >
          Housing
        </div>
        <div
          onClick={() => {
            if (userId) {
              navigate("/dash/items", {
                state: "jobs",
              });
            } else if (!userId) {
              navigate("/items", {
                state: "jobs",
              });
            }
            setShowCategory((prev) => !prev);
          }}
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
        >
          Jobs
        </div>
        <div
          onClick={() => {
            if (userId) {
              navigate("/dash/items", {
                state: "forSale",
              });
            } else if (!userId) {
              navigate("/items", {
                state: "forSale",
              });
            }
            setShowCategory((prev) => !prev);
          }}
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
        >
          Sale
        </div>
        <div
          onClick={() => {
            if (userId) {
              navigate("/dash/items", {
                state: "services",
              });
            } else if (!userId) {
              navigate("/items", {
                state: "services",
              });
            }
            setShowCategory((prev) => !prev);
          }}
          className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
        >
          Services
        </div>
      </div>

      {/* for desktop */}
      {/* <div className="bg-black text-white flex flex-row items-center justify-between w-full p-1 ">
      <div className="flex flex-row p-0.5 border border-gray-400 rounded-lg px-2 shadow-sm hover:shadow-white hover:border-green-900">
        <p className="px-1">All</p>
        <div className="border border-white h-5 min-w-5  max-w-8 rounded-full flex items-center justify-center">
          <p className="text-xs p-1  whitespace-nowrap overflow-hidden text-ellipsis">
            {countConvert(countAll)}
          </p>
        </div>
      </div>
      <div className="flex flex-row p-0.5 border border-gray-400 rounded-lg px-2 shadow-sm hover:shadow-white hover:border-green-900">
        <p className="px-1">Housing</p>
        <div className="border border-white h-5 min-w-5  max-w-8 rounded-full flex items-center justify-center">
          <p className="text-xs p-1  whitespace-nowrap overflow-hidden text-ellipsis">
            {countConvert(housingCount)}
          </p>
        </div>
      </div>
      <div className="flex flex-row p-0.5 border border-gray-400 rounded-lg px-2 shadow-sm hover:shadow-white hover:border-green-900">
        <p className="px-1">Jobs</p>
        <div className="border border-white h-5 min-w-5  max-w-8 rounded-full flex items-center justify-center">
          <p className="text-xs p-1  whitespace-nowrap overflow-hidden text-ellipsis">
            {countConvert(jobCount)}
          </p>
        </div>
      </div>
      <div className="flex flex-row p-0.5 border border-gray-400 rounded-lg px-2 shadow-sm hover:shadow-white hover:border-green-900">
        <p className="px-1">Sale</p>
        <div className="border border-white h-5 min-w-5  max-w-8 rounded-full flex items-center justify-center">
          <p className="text-xs p-1  whitespace-nowrap overflow-hidden text-ellipsis">
            {countConvert(saleCount)}
          </p>
        </div>
      </div>
      <div className="flex flex-row p-0.5 border border-gray-400 rounded-lg px-2 shadow-sm hover:shadow-white hover:border-green-900">
        <p className="px-1">Services</p>
        <div className="border border-white h-5 min-w-5  max-w-8 rounded-full flex items-center justify-center">
          <p className="text-xs p-1  whitespace-nowrap overflow-hidden text-ellipsis">
            {countConvert(serviceCount)}
          </p>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default React.memo(CategoryNavBar);
