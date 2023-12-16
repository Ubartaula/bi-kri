import React, { useEffect } from "react";
import { useSendLogoutMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [logoutMutation, { isSuccess }] = useSendLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="p-10 text-lg text-center h-full w-full bg-hero bg-cover bg-center min-h-screen ">
      <p className="text-2xl pt-4">Are you sure to logout ?</p>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-center mt-6 text-lg text-white p-2 px-6  rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
