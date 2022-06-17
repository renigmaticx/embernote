import React, { useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import { CssBaseline, Box } from '@mui/material';
import CreateNote from './components/CreateNote';
import Note from './components/Note';
import Masonry from '@mui/lab/Masonry';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme
} from '@mui/material/styles';
import { DialogProps } from '@mui/material/Dialog';
import NoteDialog from './components/NoteDialog';

function App() {
  const trashedNotes = [];
  const archivedNotes = [];

  const [editMode, setEditMode] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [note, setNote] = useState({ _id: Number, title: '', content: '' });
  const [notes, setNotes] = useState([
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
  ]);

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
    trashedNotes.push(notes[id]);
    setNotes((values) => {
      return values.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function archiveNote(id: number) {
    archivedNotes.push(notes[id]);
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
              title={note.title}
              content={note.content}
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
