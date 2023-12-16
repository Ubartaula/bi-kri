import React from "react";
import Circle from "../img/circle.png";
const LoadingComponent = () => {
  return (
    <div
      style={{ backgroundColor: "rgba(236, 236, 236, 0.5)" }}
      className=" h-screen flex items-center justify-center opacity-90  fixed top-0 bottom-0 right-0 left-0"
    >
      <div className="">
        <img src={Circle} alt="" className=" h-40 opacity-100" />
      </div>
    </div>
  );
};

export default LoadingComponent;
