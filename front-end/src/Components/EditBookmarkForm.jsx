import React from "react";
import Container from "@mui/material/Container";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import "./styles/EditBookmarkForm.css";

function EditBookmarkForm({ bookmark, handleEditClose }) {
  const [category, setCategory] = useState(bookmark.category);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description);
  const [url, setUrl] = useState(bookmark.url);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(
        "There is no token, or the token is not valid anymore. Please refresh and login again"
      );
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3003/bookmarks/${bookmark._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, title, description, category }),
        }
      );
      if (response.ok) {
        window.location.reload(false);
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log the error data to the console
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCategory" className="form-input">
          <label>Category</label>
          <TextField
            type="text"
            className="input-field"
            placeholder="Enter bookmark category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTitle" className="form-input">
          <label>Title</label>
          <TextField
            type="text"
            placeholder="Enter bookmark title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescr" className="form-input">
          <label>Description</label>
          <TextField
            type="text"
            placeholder="Enter bookmark description"
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formUrl" className="form-input">
          <label>URL</label>
          <TextField
            type="url"
            placeholder="Enter URL"
            className="input-field"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </Form.Group>
        <div>
          <Button variant="contained" type="submit" className="edit-submit-button">
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={handleEditClose}
            className="cancel-button"
          >
            Cancel
          </Button>
          </div>
      </Form>
    </Container>
  );
}

export default EditBookmarkForm;
