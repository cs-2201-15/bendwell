import React from "react";
import {
  withRouter,
  Route,
  Redirect,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Teachable from "./Components/Teachable/Teachable";
import AllStretches from "./Components/AllStretches/AllStretches";
import SingleStretch from "./Components/SingleStretch/SingleStretch";
import Account from "./Components/Account/Account";
import Routines from "./Components/Routines/Routines";
import SingleRoutine from "./Components/SingleRoutine/SingleRoutine";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import SignUp from "./Components/SignUp/SignUp";
import CreateAccount from "./Components/CreateAccount/CreateAccount";

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
          <Route path="/stretchcam" element={<Teachable />} />
          <Route path="/stretches" element={<AllStretches />} />
          <Route path="/stretches/:id" element={<SingleStretch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/testwindow" element={<Teachable />} />
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
          <Route
            path="/createaccount"
            element={<CreateAccount key={session.user.id} session={session} />}
          />
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/:id" element={<SingleRoutine />} />
          <Route path="/home" element={<Home />} />
          <Route path="/testwindow" element={<Teachable />} />
          <Route path="/" element={<Home />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesDirectory;
