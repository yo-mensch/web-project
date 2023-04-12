import React, { useState, useEffect } from "react";
import dotenv from 'dotenv';

function Body(){
  dotenv.config();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch('https://api.artsy.net/api/v1/xapp_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XAPP-Client-ID': process.env.local.X-XAPP-Client-ID,
          'X-XAPP-Client-Secret': process.env.local.X-XAPP-Client-Secret,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      setToken(data.token);
    };
    fetchToken();
  }, []);

  return (
    <div>
      <h1>x-xapp-token: {token}</h1>
    </div>
  );
}

export default Body;