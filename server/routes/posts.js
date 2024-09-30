import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments } from '../controllers/posts.js'

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

// Remove Post
//http://loaclhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost)

// Update Post
//http://loaclhost:3002/api/posts/:id/edit
router.put('/:id/edit', checkAuth, updatePost)

// Get Post Comments
//http://loaclhost:3002/api/posts/comments/:Id
router.get('/comments/:id', getPostComments);

export default router