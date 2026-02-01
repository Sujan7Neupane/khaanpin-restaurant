import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Dashboard.css";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    suspendedUsers: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard stats
  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${backend_url}/api/v1/superadmin/all-users`,
        {
          withCredentials: true,
        },
      );

      const users = res.data.data;

      const totalUsers = users.length;
      const activeUsers = users.filter((u) => u.status === "active").length;
      const suspendedUsers = users.filter(
        (u) => u.status === "disabled",
      ).length;
      const admins = users.filter((u) => u.role === "admin").length;

      setStats({ totalUsers, activeUsers, suspendedUsers, admins });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <Header />

      <main className="dashboard">
        <h2>Dashboard Overview</h2>

        <section className="stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>{stats.activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Suspended Users</h3>
            <p>{stats.suspendedUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Admins</h3>
            <p>{stats.admins}</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
