import React from "react";
import Button from '@mui/material/Button';

function HomeScreen({onLogout}){
    const handleLogout = async(e) => {
        e.preventDefault();
        try {
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
            <h1>You are logged in</h1>
            <Button variant="contained" type="submit" onClick={handleLogout}>
                Log out
            </Button>
        </>
    );
}

export default HomeScreen;