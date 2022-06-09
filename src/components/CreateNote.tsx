import React, { useState } from 'react';
import { Card, CardContent, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Collapse from '@mui/material/Collapse';

import Zoom from '@mui/material/Zoom';
import { AnyAaaaRecord } from 'dns';
import { isBuffer } from 'util';
import { NoEncryption } from '@mui/icons-material';
import { styled } from '@mui/material/styles'

export default function () {
    const greetings = 'Ignite ⭐ your ideas 💡 by adding a note. 📔📓';
  const [note, setNote] = useState({
    title: greetings,
    content: ''
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event: any) {
    const id = event.target.id;
    const newInput = event.target.value;

    // Refactor this to map the object values
    setNote((prevValue) => {
        if(id === 'note-title'){
            return{
                title: prevValue.title,
                content: newInput
            }
        }else{
            return{
                title: newInput,
                content: prevValue.content
            }
        }
    })
  };

  function handleOnClick(event: any) {
    setExpanded(true);
    if(event.target.id === 'note-title' && note.title === greetings){
        setNote({
            title: '',
            content: ''
        });
  }}

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
        <CardContainer>
        <Card
        //   sx={{ width: '50%', mx: 'auto', my: '2rem', flexGrow: 1 }}
          variant="outlined"
        >
          <CardContent>
            <TextField
              id="note-title"
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
                  placeholder="Add a note...."
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
        </CardContainer>
      </Collapse>
    </>
  );
}
