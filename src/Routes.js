import React from "react";
import {
  withRouter,
  Route,
  Redirect,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Auth from "./Components/Auth";
import Home from "./Components/Home";
import Teachable from "./Components/Teachable";
import AllStretches from "./Components/AllStretches";
import SingleStretch from "./Components/SingleStretch";
import Account from "./Components/Account";
import Routines from "./Components/Routines";
import SingleRoutine from "./Components/SingleRoutine";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";


const RoutesDirectory = () => {
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
    <Routes>
      {!session ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/stretches" element={<AllStretches />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<Home />} />
        </>
      ) : (
        <>
          <Route path="/stretchcam" element={<Teachable />} />
          <Route path="/stretches" element={<AllStretches />} />
          <Route path="/stretches/:id" element={<SingleStretch />} />
          <Route
            path="/account"
            element={<Account key={session.user.id} session={session} />}
          />
          {/* <Route path="/account" element={<Account />} /> */}
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/:id" element={<SingleRoutine />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesDirectory;
