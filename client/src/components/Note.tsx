import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { Box, IconButton, CardContent, Input, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import Zoom from '@mui/material/Zoom';

const CardWrapper = styled('div')(({ theme }) => ({
  '&:hover': {
    boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
  }
}));

function Note(props: any) {
  const [isHovered, setHovered] = useState(false);

  function handleOnClick() {
    props.onOpen(props, 'paper');
  }

  function handleOnDelete() {
    props.onDelete(props.id);
  }

  function handleOnArchive() {
    props.onArchive(props.id);
  }

  return (
    <CardWrapper
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <Card variant="outlined">
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography variant="subtitle2" onClick={handleOnClick}>
            {props.title}
          </Typography>
          <Typography variant="body2" onClick={handleOnClick}>
            {props.content.length > 500
              ? `${props.content.substring(0, 500)} ...`
              : props.content}
          </Typography>
        </CardContent>
        <Box sx={{ height: 40, display: 'flex', justifyContent: 'end' }}>
          {isHovered && (
            <>
              <Zoom in={isHovered}>
                <IconButton color="info" onClick={handleOnArchive}>
                  <ArchiveIcon></ArchiveIcon>
                </IconButton>
              </Zoom>
              <Zoom in={isHovered}>
                <IconButton color="error" onClick={handleOnDelete}>
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Zoom>
            </>
          )}
        </Box>
      </Card>
    </CardWrapper>
  );
}

export default Note;
