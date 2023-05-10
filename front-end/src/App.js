import { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';
import HomeScreen from './Components/HomeScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "There is no token, or token is not valid anymore. Please refresh and login again"
        );
      }
      try {
        const response = await fetch("http://localhost:3003/users/isLoggedIn", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        if (!response.ok) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      {isLoggedIn ? 
      <>
        <HomeScreen onLogout={handleLogout}/>
      </> : 
      <>
        <LoginForm onLogin={handleLogin}/>
      </>}
    </div>
  );
}

export default App;
