import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const HomePage = () => {
  const history = useLocation();
  const navigate = useNavigate();
  const { userId } = useToken();

  // preventing going back
  const handleBack = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    history.pathname.replace("/"); // this will put back home route even after pressing back
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [history.pathname]);

  return (
    <div className=" bg-hero min-h-screen h-full bg-center bg-cover w-full mt-[-3rem] px-4">
      <div className="text-end">
        {userId ? (
          <button
            onClick={() => navigate("/dash/logout")}
            className="px-4 bg-gray-300 border border-gray-400 hover:bg-green-700 my-2 rounded-lg p-0.5  "
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 bg-gray-300 border border-gray-400 hover:bg-green-700 my-2 rounded-lg p-0.5  "
          >
            Login
          </button>
        )}
      </div>

      <div className="flex flex-row items-center pl-3 justify-center pt-5">
        <h1 className="text-blue-600 text-[30px] pt-1 font-bold ">बिक्रि</h1>
        <h1 className="text-yellow-700 text-[20px] font-bold  ">डट</h1>
        <h1 className="text-purple-600 text-[20px] font-bold ">कम </h1>
      </div>

      <div className="flex flex-col mx-auto max-w-lg pt-10 px-2">
        <button
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
          }}
          className="bg-blue-600 text-white shadow shadow-black px-4 p-2 rounded-full mx-3 my-1 hover:bg-green-600"
        >
          All List
        </button>
        <button
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
          }}
          className="bg-blue-600 text-white shadow shadow-black px-4 p-2 rounded-full mx-3 my-1 hover:bg-green-600"
        >
          Housing
        </button>
        <button
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
          }}
          className="bg-blue-600 text-white shadow shadow-black px-4 p-2 rounded-full mx-3 my-1 hover:bg-green-600"
        >
          Jobs
        </button>
        <button
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
          }}
          className="bg-blue-600 text-white shadow shadow-black px-4 p-2 rounded-full mx-3 my-1 hover:bg-green-600"
        >
          Sale
        </button>
        <button
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
          }}
          className="bg-blue-600 text-white shadow shadow-black px-4 p-2 rounded-full mx-3 my-1 hover:bg-green-600"
        >
          Services
        </button>
      </div>
    </div>
  );
};

export default HomePage;
