import React from "react";
import logo from "../assets/ocil-logo.svg";

const PublicLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12 h-screen items-center justify-center">
      {/* Left section with logo and heading */}
      <section className="col-span-12 sm:col-span-5 flex flex-col justify-center items-center p-4">
        <img
          src={logo}
          alt="Chatter Logo"
          width={150}
          height={150}
          loading="lazy"
        />

        <h2 className="text-2xl text-center mt-4">Welcome to Chatter!</h2>
      </section>

      {/* Right section for children content */}
      <section className="col-span-12 sm:col-span-7 bg-white h-full">
        <div className="max-w-96 mx-auto flex items-center h-full">
          {children}
        </div>
      </section>
    </div>
  );
};

export default PublicLayout;
