import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippets Manager</h1>
      </Link>
      <Link to="/login">
        Login
      </Link>
      <Link to="/register">
        Register
      </Link>
    </div>
  );
}

export default Navbar;
