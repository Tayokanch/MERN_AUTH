import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Welcome from './components/Welcome.js';
import { Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard.js';
import MainApp from './components/MainApp.js';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state=> state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainApp />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
