import express from 'express'
import VerifyToken from '../midde=leware/verifytoken.js';
import { createTask, deleteTask, getMyTasks, updateTask } from '../controllers/task.controller.js';

const router = express.Router();


router.post('/new', VerifyToken, createTask)
router.get('/mytasks', VerifyToken, getMyTasks)
router.route('/modify/:id')
    .delete(VerifyToken, deleteTask)
    .put(VerifyToken, updateTask)

export default router;