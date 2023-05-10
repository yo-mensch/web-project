import React from "react";
import Container from "@mui/material/Container";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import './styles/AddNewBookmarkForm.css';

function AddNewBookmarkForm({handleClose}, {fetchData}) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async(e) => {
    const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "There is not token, or token is not valid anymore. Please refresh and login again"
        );
      }
    try {
      const response = await fetch("http://localhost:3003/bookmarks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({url, title, description, category})
      });
      if(response.ok){
        console.log("response is okey");
        fetchData();
        handleClose();
      }
    } catch (error) {
      
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
        <Button variant="contained" type="submit" className="submit-button">
            Submit
          </Button>
      </Form>
    </Container>
  );
}

export default AddNewBookmarkForm;
