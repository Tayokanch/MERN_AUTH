import { Button, TextField, Box, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5050/api/signup', inputs);
      const newUser = await res.data;
      return newUser;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        marginLeft={'auto'}
        marginRight={'auto'}
        width={'300px'}
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant="h3">Signup</Typography>
        <TextField
          value={inputs.name}
          margin="normal"
          variant="outlined"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <TextField
          type="email"
          value={inputs.email}
          margin="normal"
          variant="outlined"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <TextField
          type="password"
          value={inputs.password}
          margin="normal"
          variant="outlined"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Signup
        </Button>
      </Box>
    </form>
  );
};

export default Signup;
