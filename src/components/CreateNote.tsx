import React, { useState } from 'react';
import { Card, CardContent, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles'

export default function () {
    const greetings = 'Ignite ⭐ your ideas 💡 by adding a note. 📔📓';
  const [note, setNote] = useState({
    title: greetings,
    content: ''
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event: any) {
    const {name, value} = event.target
    setNote((values) => ({...values, [name]: value}));
  };

  function handleOnClick(event: any) {
    setExpanded(true);
    if(event.target.id === 'note-title' && note.title === greetings){
        setNote({
            title: '',
            content: ''
        });
  }}

  //styled causes input bug that rerenders the card
  const CardContainer = styled('div')(({theme}) => ({
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2rem',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginTop: '1rem',
      }
  }));

  return (
    <>
      <Collapse in={isExpanded} collapsedSize={150}>
      <Card
        //   sx={{ width: '50%', mx: 'auto', my: '2rem', flexGrow: 1 }}
          variant="outlined"
        >
          <CardContent>
            <TextField
              id="note-title"
              name="title"
              placeholder='Title'
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
                <Zoom in={isExpanded}>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  sx={{ position: 'relative', ml: '80%', mt: 2, width: '20%' }}
                  onClick={() => setExpanded(false)}
                >
                  <AddIcon />
                  Add note
                </Fab>
                </Zoom>
              </>
            )}
          </CardContent>
        </Card>
        <CardContainer>
        
        </CardContainer>
      </Collapse>
    </>
  );
}
