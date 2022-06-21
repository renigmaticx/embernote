import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import AuthService from '../services/auth';

function Login() {
  const [userLogin, setUserLogin] = React.useState({
    username: '',
    password: ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = (event) => {
    AuthService.login(userLogin)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  };

  const onRegister = () => {
    AuthService.register(userLogin)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        value={userLogin.username}
        onChange={handleOnChange}
      ></TextField>
      <TextField
        name="password"
        label="Password"
        variant="outlined"
        value={userLogin.password}
        onChange={handleOnChange}
      ></TextField>
      <Button variant="contained" color="warning" onClick={onLogin}>
        Login
      </Button>
      <Button variant="contained" color="error" onClick={onRegister}>
        Register
      </Button>
    </Box>
  );
}

export default Login;
