import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import AddNewAdmin from "../AddNewAdmin/AddNewAdmin";
import "./Users.css";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${backend_url}/api/v1/superadmin/all-users`,
        {
          withCredentials: true,
        },
      );
      setUsers(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Refresh list after adding new admin
  const handleModalClose = () => {
    setShowModal(false);
    fetchUsers();
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(
        `${backend_url}/api/v1/superadmin/users/${userId}/status`,
        {
          status: newStatus,
        },
        { withCredentials: true },
      );

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, status: newStatus } : u,
        ),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <Header />

      <main className="users-page">
        <div className="users-header">
          <h2>User Management</h2>
          <button className="primary-btn" onClick={() => setShowModal(true)}>
            Add New Admin
          </button>
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="users-list">
            <div className="user-row header">
              <span className="name-col">Name</span>
              <span className="email-col">Email</span>
              <span className="username-col">Username</span>
              <span className="role-col">Role</span>
              <span className="status-col">Status</span>
            </div>

            {users.map((user) => (
              <div className="user-row" key={user._id}>
                <span data-label="Name">{user.name || "N/A"}</span>
                <span data-label="Email">{user.email || "N/A"}</span>
                <span data-label="Username">{user.username || "N/A"}</span>
                <span data-label="Role">{user.role || "N/A"}</span>

                {/* Status select dropdown */}
                <span data-label="Status" className="status">
                  <select
                    value={user.status || "active"}
                    onChange={(e) =>
                      handleStatusChange(user._id, e.target.value)
                    }
                    className={`status-select ${user.status || ""}`}
                  >
                    <option value="active">Active</option>
                    <option value="invited">Invited</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && <AddNewAdmin onClose={handleModalClose} />}

      <Footer />
    </>
  );
};

export default Users;
