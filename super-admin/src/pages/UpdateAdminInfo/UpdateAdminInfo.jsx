import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./UpdateAdminInfo.css";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const UpdateAdminInfo = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const token = searchParams.get("token");
  //   console.log("Token from URL:", token);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return <p className="invalid-link">Invalid or missing invite link.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${backend_url}/api/v1/superadmin/admin-signup`, {
        token,
        name,
        password,
      });

      toast.success(
        "Congratulations! Admin account created successfully. Please login to continue.",
      );
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create admin account",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-admin-page">
      <form className="update-admin-form" onSubmit={handleSubmit}>
        <h2>Complete Admin Setup</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAdminInfo;
