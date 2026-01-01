import express from 'express';
import {
  encryptMessage,
  decryptMessage
  
} from '../controllers/messages.js';

const router = express.Router();

router.route('/api/messages/encrypt')
  .post(encryptMessage) 

router.route('/api/messages/decrypt')
.post(decryptMessage)


export default router;

