import express from 'express'
import { createUser, login } from '../controllers/users.js'
const router = express.Router()

//localhost:5000/users/

router.post('/signUp', createUser)
router.post('/signIn', login)


export default router