import React from "react";
import { Grid } from "@mui/material";
import Container from '@mui/material/Container';
import BookmarkCard from "./BookmarkCard";
import './styles/BookmarksGrid.css'

function BookmarksGrid({bookmarks}) {
  return (
    <Grid container spacing={2} className="bookmarks-grid" direction="row" alignItems="center">
      {bookmarks.map(bookmark => (
        <Grid key={bookmark._id} item xs={8} sm={6} md={4}>
          <BookmarkCard bookmark={bookmark}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default BookmarksGrid;
