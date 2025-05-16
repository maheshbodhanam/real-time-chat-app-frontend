import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../API/apiRequest";
import Avatar from "../components/Avatar";
import { setToken, setUser } from "../redux/userSlice";
import Loading from "../components/Loading";

const CheckPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    password: "",
    userId: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, [navigate, location?.state?.name]);

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await apiRequest(
        {
          method: "post",
          url: URL,
          data: {
            userId: location?.state?._id,
            password: data.password,
          },
        },
        setLoading
      );

      if (response.success) {
        toast.success(response.msg);
        dispatch(setToken(response?.token));
        dispatch(setUser(response?.data));

        localStorage.setItem("OCL_user", JSON.stringify(response?.data));
        localStorage.setItem("OCL_token", response?.token);

        navigate("/");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("Internal error");
    }
  };

  return (
    <div className="w-full">
      {loading && <Loading />}
      <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
        <Avatar
          width={70}
          height={70}
          name={location?.state?.name}
          imageUrl={location?.state?.profile_pic}
        />
        <h2 className="font-semibold text-lg mt-1">{location?.state?.name}</h2>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password :</label>
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

        <button className="bg-[#F07023] text-lg  p-2 w-full  rounded mt-2 hover:text-black hover:bg-[#f4955a] text-white">
          Login
        </button>
      </form>

      <p className="my-3 text-center">
        <Link
          to={"/forgot-password"}
          className="hover:text-[#F07023] font-semibold"
        >
          Forgot password ?
        </Link>
      </p>
    </div>
  );
};

export default CheckPasswordPage;
