import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MachineList from "./pages/MachineList";
import MachineDetail from "./pages/MachineDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/machines" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/machines" element={<MachineList />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/machines/:id" element={<MachineDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
