import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the email and password to the server for authentication
    // Handle the response from the server
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <TextField
          type="email" 
          placeholder="Enter email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <TextField 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
      </Form.Group>

      <Button variant="contained" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
