/* eslint-disable import/no-anonymous-default-export */
import "./index.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import Teachable from "./Teachable";

export default () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <Teachable />
        // <StretchCam />
        // <Account key={session.user.id} session={session} />
      )}
    </div>
  );
};
