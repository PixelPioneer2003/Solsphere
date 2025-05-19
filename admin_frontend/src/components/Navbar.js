import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Solsphere Admin</h2>
      </div>
      <div className="navbar-right">
        {/* You can add user info, notifications, or logout button here later */}
      </div>
    </nav>
  );
}
