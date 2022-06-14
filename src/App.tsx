import React from 'react';
import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Grid, Box } from '@mui/material';
import CreateNote from './components/CreateNote';
import Note from './components/Note';
import Masonry from '@mui/lab/Masonry';

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

  const notes = [
    {
      title: 'Umbrosa Helicoseus',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lacus non dolor imperdiet ornare. Sed ut congue lectus. Vestibulum congue nisl sed leo pulvinar dapibus. Morbi arcu velit, consectetur eget placerat in, suscipit ut est. Duis pharetra, odio vel posuere rhoncus, leo velit tempus diam, eget viverra lectus urna eu massa. Pellentesque fermentum nibh eros, ac rutrum urna congue eu. Curabitur rhoncus, arcu non pharetra vehicula, lorem tortor aliquam risus, vel pharetra massa risus interdum tortor. Integer porta porta sapien a porttitor.'
    },
    {
      title: 'Umbrosa Helicoseus',
      content:
        'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit'
    },
    {
      title: 'Umbrosa Helicoseus',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lacus non dolor imperdiet ornare. Sed ut congue lectus. Vestibulum congue nisl sed leo pulvinar dapibus. Morbi arcu velit, consectetur eget placerat in, suscipit ut est. Duis pharetra, odio vel posuere rhoncus, leo velit tempus diam, eget viverra lectus urna eu massa.'
    },
    {
      title: 'Umbrosa Helicoseus',
      content:
        'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit'
    },
    {
      title: 'Umbrosa Helicoseus',
      content:
        'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit'
    },
    {
      title: 'Umbrosa Helicoseus',
      content:
        'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit'
    }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar />
      <CreateNote />

      <Box sx={{ flexGrow: 1, mx: 2 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={1}>
          {notes.map((note, index) => (
            <Note
              key={index}
              id={index}
              title={note.title}
              content={note.content}
            />
          ))}
        </Masonry>
      </Box>
    </ThemeProvider>
  );
}

export default App;
