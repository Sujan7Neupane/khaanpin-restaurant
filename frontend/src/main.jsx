import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { HomePage, Cart, PlaceOrder } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <PlaceOrder /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  <RouterProvider router={router} />
  // </Provider>
);
