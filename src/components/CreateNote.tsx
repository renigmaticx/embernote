import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  InputBase,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';

const CardContainer = styled('div')(({ theme }) => ({
  width: '50%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '2rem',
  marginBottom: '2rem',
  flexGrow: 1,
  [theme.breakpoints.down('md')]: {
    width: '95%',
    marginTop: '1rem'
  }
}));

function CreateNote(props: any) {
  const greetings = 'Ignite ⭐ your ideas 💡 by adding a note. 📔📓';
  const [note, setNote] = useState({
    title: '',
    content: greetings
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setNote((values) => ({ ...values, [name]: value }));
  }

  function handleOnClick(event: any) {
    setExpanded(true);
    if (event.target.id === 'note-content' && note.content === greetings) {
      setNote({
        title: '',
        content: ''
      });
    }
  }

  function handleAddNote(event: any) {
    (!!note.content || !!note.title) && props.onAdd(note);
    setNote({ title: '', content: '' });
    setExpanded(false);
  }

  return (
    <>
      <Collapse in={isExpanded} collapsedSize={150}>
        <CardContainer>
          <Card elevation={4}>
            <CardContent>
              {isExpanded && (
                <TextField
                  id="note-title"
                  name="title"
                  placeholder="Title"
                  value={note.title}
                  onChange={handleChange}
                  color="primary"
                  size="small"
                  fullWidth
                />
              )}
              <TextField
                id="note-content"
                name="content"
                placeholder="Add a note...."
                value={note.content}
                onChange={handleChange}
                variant="outlined"
                multiline
                size="small"
                fullWidth
                margin="dense"
                onClick={handleOnClick}
              />
              {isExpanded && (
                <Box
                  sx={{
                    display: 'flex',
                    mb: -3,
                    justifyContent: 'end'
                  }}
                >
                  <Zoom in={isExpanded}>
                    <Button color="secondary" onClick={handleAddNote}>
                      Add note
                    </Button>
                  </Zoom>
                </Box>
              )}
            </CardContent>
          </Card>
        </CardContainer>
      </Collapse>
    </>
  );
}

export default CreateNote;
