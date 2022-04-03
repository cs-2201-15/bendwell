import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Navbar from "../Navbar/Navbar";
import "./Topbar.scss";

const Topbar = ({ menuOpen, setMenuOpen }) => {
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
    <div>
      <div className="topbar">
        <div className="wrapper">
          <div className="topbar-left">
            <Link to="/">
              <div className="logo" onClick={() => setMenuOpen(false)}>
                bendwell
              </div>
            </Link>
          </div>

          <div className="topbar-right">
            <div className="topbar-right-button">
              {!session ? (
                <>
                  <Link to="/signup">
                    <button>Sign Up</button>
                  </Link>
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                </>
              ) : (
                <button type="button" onClick={() => supabase.auth.signOut()}>
                  Logout
                </button>
              )}
            </div>

            <div className="topbar-right-menu">
              <div
                className={"hamburger " + (menuOpen && "active")}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="line1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
