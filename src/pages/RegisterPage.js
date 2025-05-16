import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../API/apiRequest";
import OAuth from "./OAuth";
import Loading from "../components/Loading";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const response = await apiRequest(
        {
          method: "post",
          url: URL,
          data: data,
        },
        setLoading
      );

      if (response.success) {
        toast.success(response.msg);
        navigate("/email");
      } else {
        toast.error(response?.msg);
      }
    } catch (error) {
      toast.error("Internal error");
    }
  };

  return (
    <div className="w-full">
      {loading && <Loading />}
      <h4 className="text-center text-bold text-2xl">Register</h4>
      <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="bg-slate-200 border border-black p-2 focus:outline-[#F07023]"
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="bg-slate-200 border border-black p-2 focus:outline-[#F07023]"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="bg-slate-200 border border-black p-2 focus:outline-[#F07023]"
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="bg-[#F07023] text-lg  p-2  rounded mt-2 hover:text-black hover:bg-[#f4955a] text-white">
          Register
        </button>
      </form>
      <p className="my-3 text-center">
        Already have account ?{" "}
        <Link to={"/email"} className="hover:text-[#F07023] font-semibold">
          Login
        </Link>
      </p>
      <p className="text-center my-2">(or)</p>
      <OAuth />
    </div>
  );
};

export default RegisterPage;
