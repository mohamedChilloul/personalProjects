import { createSlice } from "@reduxjs/toolkit";
import postsService from '../api/posts'

const postsReducer = createSlice({
    name : 'posts',
    initialState : [],
    reducers : {
        setNewPost(state, action){
            state.push(action.payload)
        },
        setPosts(state, action){
            return action.payload
        },
        updatePost(state, action){
            return state.map(p => p._id === action.payload._id ? action.payload : p)
        },
        deletePost(state, action){
            let id = action.payload
            return state.filter(p => p._id !== id)
        },
        likePost(state, action){
            return state.map(p => p._id === action.payload._id ? action.payload : p)
        }
    }
})

export const {setNewPost, setPosts, updatePost, deletePost, likePost} = postsReducer.actions

export const initPosts = () => {
    return async dispatch => {
        const posts = await postsService.getAll()
        dispatch(setPosts(posts))
    }
}

export const addNewPost = (post) => {
    return async dispatch => {
        const createdPost = await postsService.createNewPost(post)
        console.log(createdPost, ' : created post !')
        dispatch(setNewPost(createdPost))
    }
}

export const updatingPost = (id, post) =>{
    return async dispatch => {
        try {
            const updatedPost = await postsService.updatePost(id, post)
            console.log('in updating Post', updatedPost)
            dispatch(updatePost(updatedPost))
        } catch (error) {
            console.log(error)
        }
    }
}

export const deletingPost = (id) => {
    return async dispatch =>{
        try {
            await postsService.deletePost(id)
            dispatch(deletePost(id))
        } catch (error) {
            console.log(error)
        }
    }
}

export const likingPost = (id) =>{
    return async dispatch => {
        try {
            const likedPost = await postsService.likePost(id)
            console.log('in liking Post', likedPost)
            dispatch(likePost(likedPost))
        } catch (error) {
            console.log(error)
        }
    }
}


export default postsReducer.reducer