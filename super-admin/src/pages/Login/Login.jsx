import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-left">
        <h1>Super Admin Panel</h1>
        <p>Manage users, roles, and system settings securely from one place.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-box">
          <h2>Sign In</h2>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="admin@example.com" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="login-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
