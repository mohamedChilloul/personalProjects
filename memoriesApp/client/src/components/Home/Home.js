import { Container, Grid, Grow } from '@mui/material'
import React, {useEffect, useState} from 'react'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import {useMediaQuery} from '@mui/material'
import { initPosts } from '../../reducers/postsReducer'
const Home = () => {
    //using meadia query 
    const theme = useTheme()
    const extraSmall = useMediaQuery(theme.breakpoints.down('sm')); 
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    useEffect(()=>{
        dispatch(initPosts())
    })
  return (
    <Grow in>
        <Container>
            <Grid container direction={extraSmall?'column-reverse':'auto'} justify='space-between' alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts currentId={currentId} setCurrentId={setCurrentId}></Posts>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home