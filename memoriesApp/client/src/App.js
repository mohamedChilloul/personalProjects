import React, { useEffect, useState } from "react";
import memoriesImage from './images/memories.png'
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material'
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
//here we are getting media-query
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import appStyles from './styles'
import { useDispatch } from "react-redux";
import { initPosts } from "./reducers/postsReducer";
const App = () => {
    const classes = appStyles()
    //using meadia query 
    const theme = useTheme()
    const extraSmall = useMediaQuery(theme.breakpoints.down('sm')); 
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    useEffect(()=>{
        dispatch(initPosts())
    })
    return(
        <div>
            <h1>
                <Container maxWidth='lg'>
                    <AppBar position="static" color="inherit" style={classes.appBar}>
                        <Typography variant="h2" align="center" style={classes.heading}>Memories</Typography>
                        <img src={memoriesImage} alt="imageAvatar" height='60' style={classes.img}/>
                    </AppBar>
                    <Grow in>
                        <Container>
                            <Grid container direction={extraSmall?'column-reverse':'auto'} justify='space-between' alignItems='stretch' spacing={3}>
                                <Grid item xs={12} sm={7}>
                                    <Posts currentId={currentId} setCurrentId={setCurrentId}></Posts>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </Container>
            </h1>
        </div>
    )
}

export default App