import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import BookmarkCard from "./BookmarkCard";
import EditBookmarkForm from "./EditBookmarkForm";
import "./styles/BookmarksGrid.css";

function BookmarksGrid({ bookmarks }) {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  const handleFormOpen = (bookmark) => {
    setEditFormOpen(true);
    setSelectedBookmark(bookmark);
  }

  const handleFormClose = () => {
    setEditFormOpen(false);
    setSelectedBookmark(null);
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        className="bookmarks-grid"
        direction="row"
        alignItems="center"
      >
        {bookmarks.map((bookmark) => (
          <Grid key={bookmark._id} item xs={8} sm={6} md={4}>
            <BookmarkCard bookmark={bookmark} handleEditOpen={handleFormOpen}/>
          </Grid>
        ))}
      </Grid>
      {editFormOpen ? <EditBookmarkForm bookmark={selectedBookmark} handleEditClose={handleFormClose}/> : <></>}
    </>
  );
}

export default BookmarksGrid;
