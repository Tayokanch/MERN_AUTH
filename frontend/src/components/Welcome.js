import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

axios.defaults.withCredentials = true;

let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState(null);

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/refresh', {
        withCredentials: true, // this is what send the cookie/ res from the API to the next control
      });

      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/user', {
        withCredentials: true,
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => {
        if (data) {
          setUser(data?.user);
        }
      });
    }

    let Internal = setInterval(() => {
      refreshToken().then((data) => setUser(data?.user));
    }, 1000 * 25);

    return () => clearInterval(Internal);
  }, []);

  return <div>{user && <h1>{user.name}</h1>}</div>;
};
export default Welcome;
