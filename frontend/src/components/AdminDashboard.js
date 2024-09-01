import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState();
  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/admin/getUsers', {
        withCredentials: true,
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers().then((data) => {
      if (data) {
        setUsers(data?.users);
      } else {
        setUsers(null);
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-slate-700 p-5 text-center text-white">
        Admin Dashboard
      </header>
      <main className="flex-grow bg-gray-400">
        {users &&
          users.map((user) => (
            <h3 key={user._id}>{user?.name}</h3> // Use parentheses for implicit return
          ))}
      </main>
    </div>
  );
};

export default AdminDashboard;
