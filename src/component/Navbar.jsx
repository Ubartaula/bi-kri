import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentToken } from "../feature/auth/authSlice";
import useToken from "../hooks/useToken";
import {
  Bars4Icon,
  UserIcon,
  UsersIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import CategoryNavBar from "../lib/CategoryNavBar";

const Navbar = () => {
  const token = useSelector(currentToken);
  const { role, userId } = useToken();
  const location = useLocation();

  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  let managerOrSuper = false;

  if (role === "Manager" || role === "Super") {
    managerOrSuper = true;
  } else {
    managerOrSuper = false;
  }

  return (
    <div
      className={`${
        location?.pathname === "/" || location?.pathname === "/dash"
          ? "hidden"
          : "block"
      }`}
    >
      <div className="flex items-center justify-between min-h-[3rem] max-h-[3rem] fixed top-0 right-0 left-0 z-50 w-[100vw]  bg-gradient-to-r from-slate-300 to-fuchsia-400 cursor-pointer ">
        <div className="flex flex-row items-center">
          <div className="hidden xsm:block">
            <div
              onClick={() => {
                setShowCategory((prev) => !prev);
              }}
              className="sm:px-4 p-1 rounded-md min-w-[4.5rem] bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center"
            >
              Menu
            </div>
          </div>
          <div className="xsm:hidden">
            <div
              onClick={() => setShowCategory((prev) => !prev)}
              className="pl-2   "
            >
              <Bars4Icon className="h-8 w-10 shadow shadow-gray-200 rounded-lg" />
            </div>
          </div>

          <div className="flex flex-row items-center pl-3">
            <p className="text-blue-600 text-3xl pt-1 font-bold ">बिक्रि</p>
            <p className="text-yellow-700 text-xl font-bold  ">डट</p>
            <p className="text-purple-600 text-xl font-bold ">कम </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-row items-center mr-3">
          {managerOrSuper && (
            <div
              onClick={() => navigate("/dash/users")}
              className="sm:px-4 p-1 rounded-md min-w-[4.5rem] bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center"
            >
              Users
            </div>
          )}
          {token && (
            <div
              onClick={() => {
                navigate("/dash/items/new");
              }}
              className="sm:px-4  p-1 rounded-md min-w-[4.5rem] bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center"
            >
              Post
            </div>
          )}

          <div
            onClick={() => {
              if (!token) {
                navigate("/login");
              } else {
                setShowDiv((prev) => !prev);
              }
            }}
            className={`${
              location?.pathname === "/login" ? "hidden" : "block"
            } sm:px-4 p-1  rounded-md min-w-[4.5rem] bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-800 hover:to-blue-700 hover:text-white ml-3 sm:min-w-[7rem] text-center`}
          >
            {!token ? "Account" : "Profile"}
          </div>
        </div>

        <div className="sm:hidden flex flex-row items-center mr-3">
          {managerOrSuper && (
            <div onClick={() => navigate("/dash/users")} className="px-1">
              <UsersIcon className="h-8 w-10 text-white hover:text-green-700 shadow shadow-gray-200 rounded-lg" />
            </div>
          )}
          {token && (
            <div
              onClick={() => {
                navigate("/dash/items/new");
              }}
              className="px-1"
            >
              <PencilSquareIcon className="h-8 w-10 text-white hover:text-green-700 shadow shadow-gray-200 rounded-lg" />
            </div>
          )}

          <div
            onClick={() => {
              if (!token) {
                navigate("/login");
              } else {
                setShowDiv((prev) => !prev);
              }
            }}
            className={`px-1 ${
              location?.pathname === "/login" ? "hidden" : "block"
            }`}
          >
            <UserIcon className="h-8 w-10 text-white hover:text-green-600 shadow shadow-gray-200 rounded-lg" />
          </div>
        </div>

        {/* account div */}
        <div
          onMouseLeave={() => setShowDiv(false)}
          className={`${
            showDiv ? "flex" : "hidden"
          }  flex-col absolute top-[3rem] z-50 right-0 rounded-s-md p-2 px-4 bg-gradient-to-r from-purple-400 to-cyan-600 `}
        >
          <p
            className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
            onClick={() => {
              setShowDiv((prev) => !prev);
              navigate("/dash/profile");
            }}
          >
            Profile
          </p>

          <p
            className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
            onClick={() => {
              setShowDiv((prev) => !prev);
              navigate("/dash/profile/setting");
            }}
          >
            Setting
          </p>
          <p
            className="px-4 p-2 rounded-md m-1  cursor-pointer bg-blue-700 text-white text-center"
            onClick={() => {
              setShowDiv((prev) => !prev);
              navigate("/dash/logout");
            }}
          >
            Logout
          </p>
        </div>
      </div>

      {/* showCategory for Mobile */}
      <div
        onMouseLeave={() => setShowCategory(false)}
        className={`${showCategory ? "block" : "hidden"} `}
      >
        <CategoryNavBar setShowCategory={setShowCategory} />
      </div>
    </div>
  );
};

export default Navbar;
