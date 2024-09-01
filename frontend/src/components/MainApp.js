import React from 'react';
import Header from './Header';
import Signup from './Signup';
import Login from './Login';
import Welcome from './Welcome';
import { Route, Routes } from 'react-router-dom';

const MainApp = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default MainApp;
