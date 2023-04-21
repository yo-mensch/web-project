import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function LoginForm( {onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3003/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
      if(response.ok){
        console.log("logging in successful");
        onLogin();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3003/users/logout', {
        method: 'POST'
      })
      if(response.ok){
        console.log("Logout successful");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
        Log In
      </Button>
    </Form>
    {/* perkelti logout mygtuka i homescreen */}
    <Button variant="contained" type="submit" onClick={handleLogout}>
        Log out
      </Button>
    </>
  );
};

export default LoginForm;
