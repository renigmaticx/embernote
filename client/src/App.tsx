import React, { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import { CssBaseline, Box, Button, Typography } from '@mui/material';
import CreateNote from './components/CreateNote';
import Note from './components/Note';
import Masonry from '@mui/lab/Masonry';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme
} from '@mui/material/styles';
import { DialogProps } from '@mui/material/Dialog';
import NoteDialog from './components/NoteDialog';
import NoteDataService from './services/note';

function App() {
  const trashedNotes = [];
  const archivedNotes = [];

  const [editMode, setEditMode] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [note, setNote] = useState({ _id: Number, title: '', content: '' });
  const [notes, setNotes] = useState<any>([{}]);

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = () => {
    NoteDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((e) => console.log(e));
  };

  const theme = experimental_extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            light: '#ffffff',
            main: '#ffffff',
            dark: '#cccccc',
            contrastText: '#000000'
          },
          secondary: {
            light: '#cfcfcf',
            main: '#000000',
            dark: '#707070',
            contrastText: '#000000'
          }
        }
      },
      dark: {
        palette: {
          primary: {
            light: '#2c2c2c',
            main: '#000000',
            dark: '#000000',
            contrastText: '#ffffff'
          },
          secondary: {
            light: '#ffffff',
            main: '#ffffff',
            dark: '#cccccc',
            contrastText: '#000000'
          }
        }
      }
    }
  });

  function openNoteDialog(props: any, scrollType: DialogProps['scroll']) {
    setEditMode(true);
    setScroll(scrollType);
    setNote({ _id: props.id, title: props.title, content: props.content });
  }

  const closeNoteDialog = () => {
    setEditMode(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (editMode) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [editMode]);

  function addNote(newNote: any) {
    setNotes((values) => {
      return [newNote, ...values];
    });
  }

  function deleteNote(id: number) {
    //trashedNotes.push(notes[id]);
    setNotes((values) => {
      return values.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function archiveNote(id: number) {
    //archivedNotes.push(notes[id]);
    setNotes((values) => {
      return values.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Button
        color="secondary"
        onClick={() => {
          console.log(notes);
          console.log(notes.data);
        }}
      >
        Log
      </Button>
      <CreateNote onAdd={addNote} />
      {editMode && (
        <NoteDialog
          open={editMode}
          onClose={closeNoteDialog}
          scroll={scroll}
          descriptionElementRef={descriptionElementRef}
          note={note}
        />
      )}
      <Box sx={{ flexGrow: 1, mx: 2 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={1}>
          {notes.map((note, index) => (
            <Note
              key={index}
              id={index}
              title={note?.title}
              content={note?.content}
              onDelete={deleteNote}
              onArchive={archiveNote}
              onOpen={openNoteDialog}
            />
          ))}
        </Masonry>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
