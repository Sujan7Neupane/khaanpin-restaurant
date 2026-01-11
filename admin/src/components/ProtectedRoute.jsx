import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAuthState, logout, setLoading } from "../store/adminSlice";
import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    console.log("ProtectedRoute mounted");
    if (!isLoggedIn && loading) {
      const loadCurrentAdmin = async () => {
        dispatch(setLoading(true));
        try {
          const res = await axios.get(
            `${backend_url}/api/v1/admin/current-admin`,
            {
              withCredentials: true,
            }
          );
          console.log(res);

          dispatch(setAuthState({ isLoggedIn: true, user: res.data.data }));
        } catch {
          dispatch(logout());
        }
      };
      loadCurrentAdmin();
    }
  }, [dispatch, isLoggedIn, loading]);

  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/admin-login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
