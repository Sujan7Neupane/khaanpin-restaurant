import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import {
  AddDish,
  AddMenu,
  AdminDashboard,
  ListDish,
  OrderPage,
} from "./pages/index.js";

import App from "./App.jsx";
import { AdminLogin } from "./pages/index.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import ListMenu from "./pages/ListMenu.jsx";

const router = createBrowserRouter([
  {
    path: "/admin-login",
    element: (
      <>
        <ToastContainer />
        <AdminLogin />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "add", element: <AddDish /> },
      { path: "add-menu", element: <AddMenu /> },
      { path: "list", element: <ListDish /> },
      { path: "list-menu", element: <ListMenu /> },
      { path: "order", element: <OrderPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
