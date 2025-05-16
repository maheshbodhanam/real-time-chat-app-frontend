import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  PrivateRoute,
  ProtectedRoute,
  PublicRoute,
} from "../components/Auth/RouteGuards";
import PublicLayout from "../layout/PublicLayout";

const VerifyEmail = lazy(() => import("../components/Auth/VerifyEmail"));
const MessagePage = lazy(() => import("../components/MessagePage"));
const CheckEmailPage = lazy(() => import("../pages/CheckEmailPage"));
const CheckPasswordPage = lazy(() => import("../pages/CheckPasswordPage"));
const ForgotPassword = lazy(() => import("../pages/Forgotpassword"));
const Home = lazy(() => import("../pages/Home"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public Routes
      {
        path: "register",
        element: (
          <PublicRoute>
            <PublicLayout>
              <RegisterPage />
            </PublicLayout>
          </PublicRoute>
        ),
      },
      {
        path: "verify/:token",
        element: (
          <PublicRoute>
            <PublicLayout>
              <VerifyEmail />
            </PublicLayout>
          </PublicRoute>
        ),
      },

      {
        path: "email",
        element: (
          <PublicRoute>
            <PublicLayout>
              <CheckEmailPage />
            </PublicLayout>
          </PublicRoute>
        ),
      },
      {
        path: "password",
        element: (
          <PublicRoute>
            <PublicLayout>
              <CheckPasswordPage />
            </PublicLayout>
          </PublicRoute>
        ),
      },

      // Protected Routes with Role-based Access
      {
        path: "forgot-password",
        element: (
          <ProtectedRoute requiredRole="admin">
            <PublicLayout>
              <ForgotPassword />
            </PublicLayout>
          </ProtectedRoute>
        ),
      },

      // Private Routes
      {
        path: "",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
