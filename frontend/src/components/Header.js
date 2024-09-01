import React from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';

axios.defaults.withCredentials;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const sendLogOutReq = async () => {
    const res = await axios.post('http://localhost:5050/api/logout', null, {
      withCredentials: true,
    });

    if (res.status == 200) {
      return res;
    }
    return new Error('unable to logout, Please try again!');
  };

  const handleLogOut = () => {
    sendLogOutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MernAuth</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tabs
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && 
                <Tab
                  to="/login"
                  LinkComponent={Link}
                  label="Login"
                  indicatorColor="secondary"
                />
              }
              {!isLoggedIn && 
                <Tab to="/signup" LinkComponent={Link} label="Signup" />
              }
              {isLoggedIn && 
                <Tab
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                  onClick={handleLogOut}
                />
              }
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
