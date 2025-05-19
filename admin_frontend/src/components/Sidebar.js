import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Solsphere</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/machines"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Machines
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
