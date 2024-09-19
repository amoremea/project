import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createPost, getAll, getById, getMyPosts } from '../controllers/posts.js'

const router = new Router()

// Create Post
//http://loaclhost:3002/api/posts
router.post('/', checkAuth, createPost)

// Get All posts
//http://loaclhost:3002/api/posts
router.get('/', getAll)

// Get Post By Id
//http://loaclhost:3002/api/posts/:id
router.get('/:id', getById)

// Get My Posts
//http://loaclhost:3002/api/user/me
router.get('/user/me', checkAuth, getMyPosts)

export default router