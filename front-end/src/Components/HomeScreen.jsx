import React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import BookmarksGrid from "./BookmarksGrid";
import "./styles/HomeScreen.css";
import AddNewBookmarkForm from "./AddNewBookmarkForm";

function HomeScreen({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [newBookmarkBtnText, setNewBookmarkBtnText] = useState("Add new bookmark");
  const [userBookmarks, setUserBookmarks] = useState([]);
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(
        "There is not token, or token is not valid anymore. Please refresh and login again"
      );
    }
    try {
      const response = await fetch("http://localhost:3003/bookmarks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        alert("response aint okey");
      }
      const responseData = await response.json();
      setUserBookmarks(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      const response = await fetch("http://localhost:3003/users/logout", {
        method: "POST",
      });
      if (response.ok) {
        onLogout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setNewBookmarkBtnText("Close form");
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setNewBookmarkBtnText("Add new bookmark");
  };
  return (
    <>
      <Container>
        <h1>Bookmarker</h1>
        <BookmarksGrid bookmarks={userBookmarks}/>
        <div className="button-group">
          <Button
            variant="outlined"
            className="new-bookmark-button"
            onClick={open ? handleClose : handleOpen}
          >
            {newBookmarkBtnText}
          </Button>
          <Button
            variant="contained"
            type="submit"
            className="logout-button"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </Container>
      { open ? <AddNewBookmarkForm handleClose={handleClose} fetchData={fetchData}/> : <></>}
    </>
  );
}

export default HomeScreen;
