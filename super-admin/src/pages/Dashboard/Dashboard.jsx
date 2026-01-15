import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Header />

      <main className="dashboard">
        <h2>Dashboard Overview</h2>

        <section className="stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>1,103</p>
          </div>
          <div className="stat-card">
            <h3>Suspended</h3>
            <p>42</p>
          </div>
          <div className="stat-card">
            <h3>Admins</h3>
            <p>8</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
