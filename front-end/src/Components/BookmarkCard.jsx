import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { pink } from '@mui/material/colors';

function BookmarkCard({ bookmark, handleEditOpen }) {
  const handleDelete = async () =>{
    const token = localStorage.getItem("token");
  if (!token) {
    alert(
      "There is no token, or the token is not valid anymore. Please refresh and login again"
    );
    return;
  }
  try {
    const response = await fetch(`http://localhost:3003/bookmarks/${bookmark._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      window.location.reload(false);
    } else {
      const errorData = await response.json();
      console.log(errorData); // Log the error data to the console
    }
  } catch (error) {
    console.error(error);
  }
  }

  const handleEdit = () => {
    handleEditOpen(bookmark);
  }

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
          <Typography variant="body2">{bookmark.description}</Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon sx={{ color: pink[500] }}/>
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleEditOpen(bookmark)}>
            <EditIcon/>
          </IconButton>
          <a href={bookmark.url}>
            <Button size="small">Visit URL</Button>
          </a>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BookmarkCard;
