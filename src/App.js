import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import Dashbord from "./pages/Dashbord/Dashbord";
import Banks from "./pages/Banks/Banks";

import "./App.css";

const App = () => {
  return (
    <Layout>
      <Router>
        <SideNavBar />
        <div className="w-100">
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Dashbord />} />
            <Route path={"/Banks"} element={<Banks />} />
          </Routes>
        </div>
      </Router>
    </Layout>
  );
};

export default App;
