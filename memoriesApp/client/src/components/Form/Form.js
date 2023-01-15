import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import formStyles from "./styles";
import FileBase from 'react-file-base64'
import { addNewPost, updatingPost } from "../../reducers/postsReducer";
import { useDispatch, useSelector } from "react-redux";
const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        creator : '',
        title : '',
        message : '',
        tags : '',
        selectedFile : '',
    })
    const dispatch = useDispatch()

    const classes = formStyles()

    const post = useSelector(state => currentId ? state.posts.find(p => p._id === currentId) : null)

    useEffect(()=>{
        if(post) setPostData(post)
    }, [post])

    const handleCreate = (e) => {
        e.preventDefault()
        console.log('PostData from handleCreate',postData)
        if(currentId){
            dispatch(updatingPost(currentId, postData))
        }else{
            dispatch(addNewPost(postData))
        }
        handleClear()
    }
    const handleClear = () => {
        setPostData({ creator : '', title : '', message : '', tags : '', selectedFile : ''})
        setCurrentId(null)
    }
    return (
        <div>
            <Paper elevation={3} style={classes.paper}>
                <form onSubmit={handleCreate} style={classes.form}>
                    <Typography variant="h6"> {currentId ? 'Updating' : 'Creating'} A Memory </Typography>
                    <TextField style={classes.textField} variant="outlined" label='Creator' fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData, creator : e.target.value})}></TextField>
                    <TextField style={classes.textField} variant="outlined" label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title : e.target.value})}></TextField>
                    <TextField style={classes.textField} variant="outlined" label='Message' multiline fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message : e.target.value})}></TextField>
                    <TextField style={classes.textField} variant="outlined" label='Tags (coma separated)' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags : e.target.value.split(',')})}></TextField>
                    <div style={classes.fileInput}>
                        <FileBase 
                            value={postData.selectedFile} multiple={false} 
                            onDone={({base64})=> setPostData({...postData, selectedFile : base64})}
                        />
                    </div>
                        
                    <Button fullWidth variant="contained" style={classes.buttonSubmit} type='submit' size="large">Submit</Button>
                    <Button fullWidth variant="contained" color="error" onClick={handleClear} size='small'>Clear</Button>
                </form>
            </Paper>
        </div>
    )

}

export default Form