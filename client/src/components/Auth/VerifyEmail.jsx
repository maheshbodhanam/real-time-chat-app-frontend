import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../../API/apiRequest";
import Loading from "../Loading";

function VerifyEmail() {
  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/verify/${token}`;

      try {
        const response = await apiRequest(
          { method: "get", url: URL },
          setLoading
        );
        setMessage(response.msg);
      } catch (error) {
        setMessage(error.response?.msg || "Error verifying email");
      }
    };

    token && verifyEmail();
  }, [token]);

  return (
    <div>
      {loading && <Loading />}
      <p className="text-green-500">{message}</p>
      <br />
      <Link to="/email" className="text-orange-500">
        Login
      </Link>
    </div>
  );
}

export default VerifyEmail;
