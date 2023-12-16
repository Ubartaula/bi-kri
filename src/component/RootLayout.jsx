import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <main>
      <Navbar />
      <div className="mt-[3rem] bg-slate-100  min-h-[100vh] w-full h-full">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
