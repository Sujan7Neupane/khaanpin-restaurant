// main entry: src/main.jsx
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import App from "./App.jsx";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login.jsx";
import { SuperadminProtectedRoute } from "./components/SuperAdminProtectedRoutes.jsx";
import LoginProtectedRoute from "./components/LoginProtectedWrapper.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Users from "./pages/Users/Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginProtectedRoute>
        <>
          <ToastContainer />
          <Login />
        </>
      </LoginProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <SuperadminProtectedRoute>
        <App />
      </SuperadminProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <Users /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
