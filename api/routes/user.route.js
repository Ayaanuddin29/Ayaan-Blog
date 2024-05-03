import express from 'express'
const router=express.Router();
import  {deleteUser, test, updateUser}  from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
router.get('/test',test);
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
export default router;