import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Grid, Box } from '@mui/material';
import CreateNote from './components/CreateNote';
import Note from './components/Note';

function App() {
  const darkTheme = createTheme({
    palette: {
      background: { default: '#000000' },
      mode: 'dark',
      primary: {
        main: '#000000'
      }
    }
  });

  const lightTheme = createTheme({
    palette: {
      background: { default: '#FFFFFF' },
      mode: 'light',
      primary: {
        main: '#FFF'
      }
    }
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppBar />
      <CreateNote />
      <Box sx={{ flexGrow: 1, mx: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Note />
          </Grid>
          <Grid item xs={12} md={3}>
            <Note />
          </Grid>
          <Grid item xs={12} md={3}>
            <Note />
          </Grid>
          <Grid item xs={12} md={3}>
            <Note />
          </Grid>
          <Grid item xs={12} md={3}>
            <Note />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
