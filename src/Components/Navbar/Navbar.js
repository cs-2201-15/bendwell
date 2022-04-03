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
          <Link
            to="/about"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            ABOUT US
          </Link>

          <Link
            to="/stretches"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            STRETCHES
          </Link>

          <Link
            to="/signup"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            SIGN UP
          </Link>

          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            LOGIN
          </Link>
        </div>
      ) : (
        <div className="navbar-content" style={{ textDecoration: "none" }}>
          <Link
            to="/stretches"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            STRETCHES
          </Link>

          <Link
            to="/routines"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            ROUTINES
          </Link>

          <Link
            to="/account"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            ACCOUNT
          </Link>
          <Link
            to="/about"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            ABOUT US
          </Link>
        </div>
      )}
    </div>
  );
}
