import React from "react";
import { Grid } from "@mui/material";
import Container from '@mui/material/Container';
import BookmarkCard from "./BookmarkCard";

function BookmarksGrid() {
  return (
    <Container>
    <Grid container spacing={2} direction="row" alignItems="center">
      <Grid item xs={8} sm={6} md={4}>
        <BookmarkCard />
      </Grid>
      <Grid item xs={8} sm={6} md={4}>
        <BookmarkCard />
      </Grid>
      <Grid item xs={8} sm={6} md={4}>
        <BookmarkCard />
      </Grid>
      <Grid item xs={8} sm={6} md={4}>
        <BookmarkCard />
      </Grid>
    </Grid>
    </Container>
  );
}

export default BookmarksGrid;
