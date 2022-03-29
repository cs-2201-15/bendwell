/* eslint-disable import/no-anonymous-default-export */
import "./App.scss";
// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import Auth from "./Auth";
// import Account from "./Account";
// import Teachable from "./Teachable";
import Navbar from "./Navbar/Navbar";
import RoutesDirectory from "../Routes";

export default () => {
  return (
    <div className="container">
      <Navbar />
      <RoutesDirectory />
    </div>
  );
};
