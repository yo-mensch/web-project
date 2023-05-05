import React from "react";
import Button from '@mui/material/Button';
import BookmarksGrid from "./BookmarksGrid";

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
        <>
            <h1>Bookmarker</h1>
            <BookmarksGrid/>
            <Button variant="contained" type="submit" onClick={handleLogout}>
                Log out
            </Button>
        </>
    );
}

export default HomeScreen;