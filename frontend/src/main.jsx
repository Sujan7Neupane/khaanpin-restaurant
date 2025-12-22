import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import { HomePage, Cart, PlaceOrder, About, Contact } from "./pages/index.js";

/**
 * Define application routes
 * -----------------------------------------------
 * - Root path "/" renders the App component
 * - Nested routes render specific pages inside the <Outlet /> of App
 */
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // App layout containing Header, Footer, etc.
    children: [
      { index: true, element: <HomePage /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <PlaceOrder /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
