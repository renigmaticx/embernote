import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { CardContent, Typography } from '@mui/material';

function Note() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2">Umbrosa Helicoseus</Typography>
        <Typography variant="body2">
          Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. In nec lacus non dolor imperdiet
          ornare. Sed ut congue lectus. Vestibulum congue nisl sed leo pulvinar
          dapibus. Morbi arcu velit, consectetur eget placerat in, suscipit ut
          est. Duis pharetra, odio vel posuere rhoncus, leo velit tempus diam,
          eget viverra lectus urna eu massa. Pellentesque fermentum nibh eros,
          ac rutrum urna congue eu. Curabitur rhoncus, arcu non pharetra
          vehicula, lorem tortor aliquam risus, vel pharetra massa risus
          interdum tortor. Integer porta porta sapien a porttitor.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Note;
