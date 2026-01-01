import express from 'express';
import {
  encryptMessage,
  decryptMessage
  
} from '../controllers/messages.js';//שמות פונקציות להתאים ונתיבים

const router = express.Router();

router.route('/api/messages/encrypt')
  .post(encryptMessage) 
  // Create a new Message
//   .get(getMessages);   // Get all Messages (optional filtering by productId)

router.route('/api/messages/decrypt')
.post(decryptMessage)
//   .get(getMessage)       // Get a specific Message by ID
//   .put(updateMessage)    // Update an existing Message
//   .delete(deleteMessage); // Delete an Message
// router.route('/api/messages')
// .get(getMessage)

export default router;

