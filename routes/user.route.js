import express from 'express'
import User from '../models/user.model.js';
import { getAllUsers, register, login, getMyDetail, logout } from '../controllers/user.controller.js';
import VerifyToken from '../midde=leware/verifytoken.js';

const router = express.Router();



// fetch all user data
router.get('/all', getAllUsers)
router.get('/register', register)
router.get('/login', login)
router.get('/logout', logout)


router.get('/:id', VerifyToken, getMyDetail)





//fetching a particulat user data

export default router;