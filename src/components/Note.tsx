import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';

function Note(props: any) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2">{props.title}</Typography>
        <Typography variant="body2">{props.content}</Typography>
      </CardContent>
    </Card>
  );
}

export default Note;
