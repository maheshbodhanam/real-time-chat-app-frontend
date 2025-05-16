import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../assets/ocil-logo.svg";
import Sidebar from "../components/Sidebar";
import SocketController from "../SocketController";

const Home = () => {
  const location = useLocation();

  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <SocketController />
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
