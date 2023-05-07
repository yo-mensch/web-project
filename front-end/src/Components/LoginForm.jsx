import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import {Box} from "@mui/material";
import './styles/LoginForm.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("logging in successful");
        localStorage.setItem("token", data.token);
        console.log(localStorage);
        onLogin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="container">
        <Box component="div" className="login-form-box">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group controlId="formEmail" className="form-input">
            <label>Email address</label>
            <TextField
              type="email"
              className="input-field"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-input">
          <label>Password</label>
            <TextField
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="contained" type="submit" className="login-button">
            Log In
          </Button>
        </Form>
        </Box>
      </Container>
    </>
  );
}

export default LoginForm;
