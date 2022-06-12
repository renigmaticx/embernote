import React from 'react';
import './App.css';
import AppBar from "./components/AppBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppBar />
      <CreateNote />
    </ThemeProvider >

  );
}

export default App;
