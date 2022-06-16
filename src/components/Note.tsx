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
  const [isExpanded, setExpanded] = useState(false);
  const [isHovered, setHovered] = useState(false);

  function handleOnClick(event: any) {
    setExpanded(true);
  }

  return (
    <CardWrapper
      // this causes a bug that rerenders notes
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card variant="outlined">
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography
            suppressContentEditableWarning={true}
            contentEditable={true}
            variant="subtitle2"
            spellCheck={false}
            sx={{ outline: '0 solid transparent' }}
            onClick={handleOnClick}
          >
            {props.title}
          </Typography>
          <Typography
            suppressContentEditableWarning={true}
            contentEditable={true}
            variant="body2"
            spellCheck={false}
            sx={{ outline: '0 solid transparent' }}
            onClick={handleOnClick}
          >
            {props.content}
          </Typography>
        </CardContent>
        <Box sx={{ height: 40, display: 'flex', justifyContent: 'end' }}>
          {isHovered && (
            <>
              <Zoom in={isHovered}>
                <IconButton>
                  <ArchiveIcon></ArchiveIcon>
                </IconButton>
              </Zoom>
              <Zoom in={isHovered}>
                <IconButton>
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
