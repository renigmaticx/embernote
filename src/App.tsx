import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from "./components/AppBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import { CssBaseline } from '@mui/material';
import CreateNote from './components/CreateNote';

function App() {
  const darkTheme = createTheme({
    palette: {
      background: { default: '#000000' },
      mode: 'dark',
      primary: {
        main: '#000000',
      },
    },
  })

  const lightTheme = createTheme({
    palette: {
      background: { default: '#FFFFFF' },
      mode: 'light',
      primary: {
        main: '#FFF',
      },
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar />
      <CreateNote />
    </ThemeProvider >

  );
}

export default App;
