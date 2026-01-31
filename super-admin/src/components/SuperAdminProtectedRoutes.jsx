import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import axios from "axios";
import { logout, setAuthState, setLoading } from "../store/superadminSlice";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const SuperadminProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state) => state.superadmin);

  useEffect(() => {
    if (!isLoggedIn) {
      const loadCurrentSuperadmin = async () => {
        dispatch(setLoading(true));
        try {
          const res = await axios.get(
            `${backend_url}/api/v1/superadmin/current-superadmin`,
            { withCredentials: true },
          );
          dispatch(setAuthState({ isLoggedIn: true, user: res.data.data }));
        } catch {
          dispatch(logout());
        }
      };
      loadCurrentSuperadmin();
    }
  }, [dispatch, isLoggedIn]);

  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
};
