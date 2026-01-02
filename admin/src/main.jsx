import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import { AddDish, AdminDashboard, ListDish, OrderPage } from "./pages/index.js";

import App from "./App.jsx";
// import { AdminLogin } from "./components/index.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // {
  //   path: "/admin-login",
  //   element: <AdminLogin />,
  // },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "add", element: <AddDish /> },
      { path: "list", element: <ListDish /> },
      { path: "order", element: <OrderPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
