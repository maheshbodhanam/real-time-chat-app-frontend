import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUser, setSocketConnection } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";

const SocketController = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("OCL_token");

  useEffect(() => {
    if (token) {
      const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
        auth: { token },
      });

      socketConnection.on("onlineUser", (data) => {
        dispatch(setOnlineUser(data));
      });

      // Store socket connection in redux state
      dispatch(setSocketConnection(socketConnection));

      // Clean up when the component is unmounted
      return () => {
        socketConnection.disconnect();
      };
    } else {
      navigate("/email");
    }
  }, [token, dispatch, navigate]);

  return null;
};

export default SocketController;
