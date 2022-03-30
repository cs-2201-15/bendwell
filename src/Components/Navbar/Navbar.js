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
      <div className="navbar-close" onClick={() => setMenuOpen(false)}>
        <div>Close</div>
        {/* <img src={"../../../public/close_black_24dp.svg"} alt="close menu" /> */}
        <div className="navbar-close-button"></div>
      </div>
      {!session ? (
        <div className="navbar-content">
          <Link
            to="/stretches"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Stretches
          </Link>
          <br />
          <Link
            to="/signup"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Create Account
          </Link>
          <br />
          <Link
            to="/about"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <br />
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="navbar-content" style={{ textDecoration: "none" }}>
          <Link
            to="/stretches"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Stretches
          </Link>
          <br />
          <Link
            to="/routines"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Routines
          </Link>
          <br />
          <Link
            to="/about"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <br />
          <Link
            to="/account"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
        </div>
      )}
    </div>
  );
}
