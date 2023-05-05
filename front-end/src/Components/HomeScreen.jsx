import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import BookmarksGrid from "./BookmarksGrid";
import './styles/HomeScreen.css'

function HomeScreen({onLogout}){
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
        <Container className="home-screen-content">
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