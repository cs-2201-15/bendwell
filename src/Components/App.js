/* eslint-disable import/no-anonymous-default-export */
import './index.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Auth from './Auth';
import Account from './Account';
import Teachable from './Teachable';
import Navbar from './Navbar';
import RoutesDirectory from '../Routes';

export default () => {
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Navbar />
      <RoutesDirectory />
    </div>
  );
};
