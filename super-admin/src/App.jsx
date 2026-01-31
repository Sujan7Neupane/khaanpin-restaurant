import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default App;
