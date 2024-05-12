import express from 'express'
import { createComment, deleteComment, editComment, getPostComment, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js'
const router=express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getpostcomment/:postId',getPostComment);
router.put('/likecomment/:commentId',verifyToken,likeComment);
router.put('/editcomment/:commentId',verifyToken,editComment);
router.delete('/deletecomment/:commentId',verifyToken,deleteComment);
export default router;