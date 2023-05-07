import React from "react";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import BookmarksGrid from "./BookmarksGrid";
import './styles/HomeScreen.css';

function HomeScreen({onLogout}){
    const token = localStorage.getItem('token');
    const [userBookmarks, setUserBookmarks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            alert("There is not token, or token is not valid anymore. Please refresh and login again");
          }  
          try {
            const response = await fetch('http://localhost:3003/bookmarks/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET'
            });   
            if (!response.ok) {
                alert("response aint okey");
            }   
            const responseData = await response.json();
            setUserBookmarks(responseData);
            console.log(responseData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    
    const handleLogout = async(e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            const response = await fetch('http://localhost:3003/users/logout', {
            method: 'POST'
            })
            if(response.ok){
            onLogout();}
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Container>
            <h1>Bookmarker</h1>
            <BookmarksGrid/>
            <div className="button-group">
                <Button variant="outlined" className="new-bookmark-button">
                    Add a new bookmark
                </Button>
                <Button variant="contained" type="submit" className="logout-button" onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </Container>
    );
}

export default HomeScreen;