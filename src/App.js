import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import SideNavBar from "./components/SideNavBar/SideNavBar";

import Dashbord from "./pages/Dashbord/Dashbord";
import Banks from "./pages/Banks/Banks";
import Project from "./pages/Projects/Project";
import Costcenter from "./pages/Costcenter/Costcenter";
import FiscalYear from "./pages/FiscalYear/FiscalYear";

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
            <Route path={"/Project"} element={<Project />} />
            <Route path={"/Costcenter"} element={<Costcenter />} />
            <Route path={"/FiscalYear"} element={<FiscalYear />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </Router>
    </Layout>
  );
};

export default App;
