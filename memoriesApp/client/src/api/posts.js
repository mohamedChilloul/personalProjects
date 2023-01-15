import axios from 'axios'

const url = 'http://localhost:5000/posts'

const getAll = async () => {
    const posts = await axios.get(url)
    return posts.data
}

const createNewPost = async (post) => {
    const createdPost = await axios.post(url, post)
    return createdPost.data
}

const updatePost = async (id, post) =>{
    console.log("id from Api", id)
    console.log("post from Api", post)
    const updatedPost = await axios.patch(`${url}/${id}`, post)
    return updatedPost.data
} 

const likePost = async (id) =>{
    const likedPost = await axios.get(`${url}/${id}`)
    return likedPost.data
} 

const deletePost = async (id) => {
    return await axios.delete(`${url}/${id}`)
}
export default {getAll, createNewPost, updatePost, deletePost, likePost}