import { Router } from 'express'
import {register, login, getMe} from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// Register
//http://loaclhost:3002/api/register
router.post('/register', register)

// Login
//http://loaclhost:3002/api/login
router.post('/login', login)

// Get Me
//http://loaclhost:3002/api/me
router.get('/me', checkAuth, getMe)

export default router