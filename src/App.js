import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import Dashbord from "./pages/Dashbord/Dashbord";

import "./App.css";

const App = () => {
  return (
    <Layout>
      <Router>
        <SideNavBar />
        <Routes>
          <Route path={"/"} element={<Dashbord />}/>
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
