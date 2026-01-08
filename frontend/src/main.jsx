import { createRoot } from "react-dom/client";
// TODO import React, { lazy, Suspense } from "react";

import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import {
  HomePage,
  Cart,
  PlaceOrder,
  About,
  Contact,
  Profile,
} from "./pages/index.js";
import OrderDisplay from "./pages/OrderDisplay/OrderDisplay.jsx";

// TODO: Lazy Load the pages for optimization
// const HomePage = lazy(() => import("./pages/index.js"));

/**
 * Define application routes
 * -----------------------------------------------
 * - Root path "/" renders the App component
 * - Nested routes render specific pages inside the <Outlet /> of App
 */

// TODO
// // Suspense wrapper
// const LoaderWrapper = (Component) => (
//   <Suspense fallback={<div className="loading">Loading...</div>}>
//     <Component />
//   </Suspense>
// );

const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // App layout containing Header, Footer, etc.
    children: [
      // TODO { index: true, element: LoaderWrapper(HomePage) },
      { index: true, element: <HomePage /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <PlaceOrder /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <Profile /> },
      { path: "my-orders", element: <OrderDisplay /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
