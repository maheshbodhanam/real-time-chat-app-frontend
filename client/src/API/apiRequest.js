import { Capacitor, CapacitorHttp } from "@capacitor/core";
import axios from "axios";

const isNative = Capacitor.isNativePlatform();

export const apiRequest = async (config = {}, setLoading) => {
  const {
    method = "GET",
    url,
    headers = { "Content-Type": "application/json" },
    data = {},
  } = config;

  if (setLoading) setLoading(true);

  try {
    let response;

    if (isNative) {
      // Use Capacitor Http plugin in a native environment
      response = await CapacitorHttp.request({
        method,
        url,
        headers,
        data,
      });
    } else {
      // Use Axios in a web environment
      response = await axios({
        method,
        url,
        headers,
        data,
      });
    }

    return response?.data;
  } catch (error) {
    const status = error.response?.status || "unknown";
    const msg =
      error.response?.data?.msg || error.message || "An error occurred";

    console.error(`API Request Error [${status}]: ${msg}`);

    return { status, msg };
  } finally {
    if (setLoading) setLoading(false);
  }
};
