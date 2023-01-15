import PostMessage from '../models/postMessage.js'
// this link is very usefull for knowing status 
// restapitutoriel.com/httpstatuscodes.html

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body  
    const newPost = new PostMessage(post)
    console.log(post, ' : body')
    console.log(newPost, ' : newPost')
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id
    const post = req.body
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post, _id : id}, {new : true})
        res.json(updatedPost)
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id
    console.log('id from delete', id)
    try {
        await PostMessage.findByIdAndRemove(id)
        res.status(204).end()
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (req, res) => {
    const id = req.params.id
    let postToLike = await PostMessage.findById(id)
    postToLike.likeCount = postToLike.likeCount + 1
    console.log(postToLike, 'Post TO Like')
    try {
        const likedPost = await postToLike.save()
        console.log(likedPost)
        res.json(likedPost)
    } catch (error) {
        console.log(error)
    }
}
