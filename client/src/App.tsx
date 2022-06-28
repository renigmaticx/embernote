import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';
import { CssBaseline, Box, Button, Typography } from '@mui/material';
import CreateNote from './components/CreateNote';
import Note from './components/Note';
import Masonry from '@mui/lab/Masonry';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { DialogProps } from '@mui/material/Dialog';
import NoteDialog from './components/NoteDialog';
import NoteDataService from './services/note';
import Login from './components/Login';
import theme from './components/Theme';
import AuthService from './services/auth';

function App() {
  const trashedNotes = [];
  const archivedNotes = [];

  const [user, setUser] = useState({
    userId: '',
    username: '',
    refreshToken: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [note, setNote] = useState({ _id: Number, title: '', content: '' });
  const [notes, setNotes] = useState<any>([{}]);

  const getLocalUser = () => {
    const token = window.localStorage.getItem('canislupus');
    const localUser = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (token && localUser) {
      setUser({
        userId: localUser.userId,
        username: localUser.username,
        refreshToken: token
      });
    }
  };

  const requestAccessToken = () => {
    AuthService.getAccessToken(user)
      .then((response) => {
        window.localStorage.setItem('feliscatus', response.data.accessToken);
      })
      .catch((e) => console.error(e));
  };

  const retrieveNotes = () => {
    NoteDataService.getNotes({ userId: user.userId })
      .then((response) => {
        console.log(response);
        const notesList = response.data.notes_list;
        notesList && setNotes(notesList);
      })
      .catch((e) => console.log(e));
  };

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
    console.log('Adding note...');
    NoteDataService.addNote({ ...newNote, userId: user.userId })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => console.error(e));
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

  useEffect(() => {
    getLocalUser();
  }, []);

  useEffect(() => {
    requestAccessToken();
  }, [user]);

  useEffect(() => {
    retrieveNotes();
  }, [user]);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
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
                    {notes &&
                      notes.map((note, index) => (
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
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
