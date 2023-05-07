import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function BookmarkCard({bookmark}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {bookmark.category}
      </Typography>
      <Typography sx={{ fontSize: 18 }} color="text.primary">
        {bookmark.title}
      </Typography>
      <Typography variant="body2">
        {bookmark.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Edit bookmark</Button>
      <a href={bookmark.url}>
        <Button size="small">Visit URL</Button>
      </a>
    </CardActions>  
      </Card>
    </Box>
  );
}

export default BookmarkCard;