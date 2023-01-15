import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import postStyles from "./styles";
import moment from 'moment'
import {Delete, MoreHoriz, ThumbUp} from '@mui/icons-material'
import { useDispatch } from "react-redux";
import { deletingPost, likingPost } from "../../../reducers/postsReducer";
const Post = ({post, setCurrentId}) => {
    const classes = postStyles()
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        console.log('handleDelete has been called whith : ', id)
        dispatch(deletingPost(id))
    }
    const handleLike = (id) => {
        console.log('handleLike has been called whith : ', id)
        dispatch(likingPost(id))
    }

    return(
        <Card style={classes.card}>
            <CardMedia
                image={post.selectedFile}
                style={classes.media}
                title={post.title}
            />
            <div style={classes.overlay}>
                <Typography variant="h6" >{post.creator}</Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div style={classes.overlay2}>
                <Button style={{color : 'white'}} size='small' onClick={()=>{  setCurrentId(post._id) }}>
                    <MoreHoriz></MoreHoriz>
                </Button>
            </div>
            <div style={classes.details}>
                <Typography variant="body2" color='textSecondary'>{post.tags.map(t=>`#${t} `)}</Typography>
            </div>
            <Typography style={classes.title} variant="h5" gutterBottom>
                    {post.title}
            </Typography>
            <CardContent >
                <Typography color='textSecondary' variant="body2" component='p'>
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions style={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=>{handleLike(post._id)}}>
                    <ThumbUp fontSize="small"></ThumbUp>
                    &nbsp;Like &nbsp;
                    {post.likeCount}  
                </Button>
                <Button size="small" color="error" onClick={()=>{handleDelete(post._id)}}>
                    <Delete fontSize="small"></Delete>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post