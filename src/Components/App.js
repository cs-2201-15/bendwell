/* eslint-disable import/no-anonymous-default-export */
import { useState } from 'react';
import './App.scss';
// import { supabase } from "../supabaseClient";
// import Auth from "./Auth";
// import Account from "./Account";
// import Teachable from "./Teachable";
import Navbar from './Navbar/Navbar';
import RoutesDirectory from '../Routes';
import Topbar from './Topbar/Topbar';

export default () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <RoutesDirectory />
    </div>
  );
};
