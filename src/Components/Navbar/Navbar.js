import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function Navbar() {
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
      {!session ? (
        <nav>
          <Link to="/home">
            <h1>BendWell</h1>
          </Link>
          <Link to="/stretches">Stretches</Link>
          <Link to="/signup">Create Account</Link>
          <Link to="/login">Login</Link>
        </nav>
      ) : (
        //Login
        <>
          <nav>
            <Link to="/home">
              <h1>BendWell</h1>
            </Link>
            <Link to="/stretches">Stretches</Link>
            <Link to="/routines">Routines</Link>
            <Link to="/account">My Account</Link>
          </nav>
        </>
      )}
    </div>
  );
}
