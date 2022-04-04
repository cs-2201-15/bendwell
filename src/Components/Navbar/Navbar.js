import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "./navbar.scss";

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    //sets session to current login user data
    setSession(supabase.auth.session());

    //calls event listener for any change in auth
    //if logout user sets session to null
    //if login user sets session to current user data see line 10
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div
      className={"navbar " + (menuOpen && "active")}
      style={{ textDecoration: "none" }}
    >
      {!session ? (
        <div className="navbar-content">
          <div className="navbar-content-link">
            <Link
              to="/about"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              ABOUT US
            </Link>
          </div>
          <div className="navbar-content-link">
            <Link
              to="/stretches"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              STRETCHES
            </Link>
          </div>
          <div className="navbar-content-link">
            <Link
              to="/signup"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              SIGN UP
            </Link>
          </div>
          <div className="navbar-content-link">
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        </div>
      ) : (
        <div className="navbar-content" style={{ textDecoration: "none" }}>
          <div className="navbar-content-link">
            <Link
              to="/stretches"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              STRETCHES
            </Link>
            <span className="navbar-content-link-underline"></span>
          </div>
          <div className="navbar-content-link">
            <Link
              to="/routines"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              ROUTINES
            </Link>
            <span className="navbar-content-link-underline"></span>
          </div>
          <div className="navbar-content-link">
            <Link
              to="/account"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              ACCOUNT
            </Link>
            <span className="navbar-content-link-underline"></span>
          </div>
          <div className="navbar-content-link">
            <Link
              to="/about"
              style={{ textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <span className="navbar-content-link-underline"></span>
          </div>
        </div>
      )}
    </div>
  );
}
