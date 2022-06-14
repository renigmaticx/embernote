import React, { useState } from 'react';
import { Box, Card, CardContent, Fab, TextField } from '@mui/material';
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
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '1rem'
  }
}));

function CreateNote() {
  const greetings = 'Ignite ⭐ your ideas 💡 by adding a note. 📔📓';
  const [note, setNote] = useState({
    title: greetings,
    content: ''
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setNote((values) => ({ ...values, [name]: value }));
  }

  function handleOnClick(event: any) {
    setExpanded(true);
    if (event.target.id === 'note-title' && note.title === greetings) {
      setNote({
        title: '',
        content: ''
      });
    }
  }

  return (
    <>
      <Collapse in={isExpanded} collapsedSize={150}>
        <CardContainer>
          <Card elevation={4}>
            <CardContent>
              <TextField
                id="note-title"
                name="title"
                placeholder="Title"
                value={note.title}
                onChange={handleChange}
                color="primary"
                variant="outlined"
                size="small"
                fullWidth
                onClick={handleOnClick}
              />
              {isExpanded && (
                <>
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
                  />
                  <Box sx={{ display: 'block', width: '100%' }}>
                    <Zoom in={isExpanded}>
                      <Fab
                        size="medium"
                        color="primary"
                        sx={{ position: 'relative', mt: 2, ml: '90%' }}
                        onClick={() => setExpanded(false)}
                      >
                        <AddIcon />
                      </Fab>
                    </Zoom>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </CardContainer>
      </Collapse>
    </>
  );
}

export default CreateNote;
