import React, { useState } from "react";
import taost from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { apiRequest } from "../API/apiRequest";
import { setUser } from "../redux/userSlice";
import Divider from "./Divider";
import Loading from "./Loading";

const EditUserDetails = ({ onClose, user }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;

      const response = await apiRequest(
        {
          method: "patch",
          url: URL,
          data: { name: name, userId: user?._id },
        },
        setLoading
      );

      if (response.success) {
        taost.success(response?.msg);
        dispatch(setUser(response.data));
        onClose();
      } else {
        taost.error(response.msg);
      }
    } catch (error) {
      taost.error("Internal error");
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      {loading && <Loading />}

      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-bold flex gap-2 items-center justify-center">
          Profile Details
          <span onClick={() => setEdit(true)}>
            <BiEdit className="cursor-pointer" />
          </span>
        </h2>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          Name:
          <input
            disabled={!edit}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-1 px-2 bg-gray-300 focus:outline-none disabled:cursor-not-allowed"
          />
          <Divider />
          <div className="flex gap-2 w-fit ml-auto ">
            <button
              onClick={onClose}
              className="border-orange-500 border text-orange-500 px-4 py-1 rounded hover:bg-orange-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              disabled={!edit}
              onClick={handleSubmit}
              className="border-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed bg-orange-500 text-white border px-4 py-1 rounded hover:bg-orange-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
