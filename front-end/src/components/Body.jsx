import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function Body(){
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch('https://api.artsy.net/api/v1/xapp_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XAPP-Client-ID': 'YOUR_CLIENT_ID',
          'X-XAPP-Client-Secret': 'YOUR_CLIENT_SECRET',
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