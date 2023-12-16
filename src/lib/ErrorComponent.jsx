import React from "react";
import errImage from "../img/no-image-available.jpg";
const ErrorComponent = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-black h-screen">
      {error && (
        <p className="text-white p-2 mt-[-10rem] text-xl">
          Error :{error?.data?.message || error?.status}
        </p>
      )}
      <img
        src={errImage}
        alt="chitra..."
        className=" animate-pulse"
        height={400}
        width={"auto"}
      />
    </div>
  );
};

export default ErrorComponent;
