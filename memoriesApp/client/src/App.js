import React from "react";
import {Container, createTheme} from '@mui/material'
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { Routes, Route } from 'react-router-dom'
import Auth from "./components/Auth/Auth";
import { ThemeProvider } from "@mui/styles";
const App = () => {
    const theme = createTheme({
        
    })
    return(
        <ThemeProvider theme={theme}>
            <Container maxWidth='lg'>
                <NavBar></NavBar>
                <Routes>
                    <Route path="/" exact element={<Home/>}></Route>
                    <Route path="/auth"  element={<Auth/>}></Route>
                </Routes>
            </Container>
        </ThemeProvider>
    )
}

export default App