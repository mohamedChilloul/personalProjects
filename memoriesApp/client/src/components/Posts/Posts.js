import React from "react";
import Post from "./Post/Post";
import { useSelector } from 'react-redux'
import postsStyles from "./styles";
import { CircularProgress, Grid } from "@mui/material";
const Posts = ({currentId, setCurrentId}) => {
    const classes = postsStyles()
    //const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    console.log(posts, 'posts')
    if(posts.length ===0){
        return (
            <CircularProgress/>
        )
    }
    return(
        <>
            <Grid container style={classes.mainContainer} alignItems='stretch' spacing={3}>
                {posts.map(p=> (
                    <Grid item key={p._id} xs={12} sm={6}>
                        <Post post={p} currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                ) )}
            </Grid>
        </>
        
    )
}

export default Posts