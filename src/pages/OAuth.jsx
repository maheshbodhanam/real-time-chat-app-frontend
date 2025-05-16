import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../API/apiRequest";
import { app } from "../firebase";
import { setToken, setUser } from "../redux/userSlice";
import { useState } from "react";
import Loading from "../components/Loading";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/google-signin`;

      const response = await apiRequest(
        {
          method: "POST",
          url: URL,
          data: {
            name: result.user.displayName,
            email: result.user.email,
          },
        },
        setLoading
      );

      if (response.success) {
        toast.success(response.msg);
        dispatch(setToken(response?.token));
        dispatch(setUser(response?.data));

        // Convert the user data to a JSON string before storing it in localStorage
        localStorage.setItem("OCL_user", JSON.stringify(response?.data));

        localStorage.setItem("OCL_token", response?.token);

        navigate("/");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("could not login with google");
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-[#F07023] text-white rounded-lg w-full p-3 uppercase hover:opacity-95"
      >
        Continue with google
      </button>
      {loading && <Loading />}
    </>
  );
}
