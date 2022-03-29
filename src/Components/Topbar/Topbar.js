import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Topbar.scss';

const Topbar = ({ menuOpen, setMenuOpen }) => {
  return (
    <div>
      <div className="topbar">
        <div className="wrapper">
          <div className="topbar-left">
            <Link to="/signup">Create Account</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="topbar-middle">
            <Link to="/home">
              <div className="logo">BendWell</div>
            </Link>
          </div>

          <div className="topbar-right">
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
