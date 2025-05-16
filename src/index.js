import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import router from "./rotues";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);

reportWebVitals();
