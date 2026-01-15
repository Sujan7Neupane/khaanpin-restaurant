import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Users.css";

const Users = () => {
  return (
    <>
      <Header />

      <main className="users-page">
        <div className="users-header">
          <h2>User Management</h2>
          <button className="primary-btn">Add User</button>
        </div>

        <div className="users-list">
          <div className="user-row header">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
          </div>

          <div className="user-row">
            <span>John Doe</span>
            <span>john@example.com</span>
            <span>Admin</span>
            <span className="status active">Active</span>
          </div>

          <div className="user-row">
            <span>Jane Smith</span>
            <span>jane@example.com</span>
            <span>User</span>
            <span className="status suspended">Suspended</span>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Users;
