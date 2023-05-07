import { useState } from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';
import HomeScreen from './Components/HomeScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
