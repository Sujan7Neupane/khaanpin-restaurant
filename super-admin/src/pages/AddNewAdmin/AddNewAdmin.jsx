import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddNewAdmin.css";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const AddNewAdmin = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${backend_url}/api/v1/superadmin/add-admin`,
        { email },
        { withCredentials: true },
      );

      toast.success("Admin Invitation sent successfully!");
      setEmail("");
      onClose();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create admin";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add New Admin</h3>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button className="primary-btn" disabled={loading}>
              {loading ? "Sending Invite..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAdmin;
