import express from 'express';
import {
  createUser,
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser
} from '../controllers/users.js';//להתאים שמות פונקציות ונתיבים

const router = express.Router();

router.route('/api/auth/register')
  .post(createUser) // Create a new User
//   .get(getUsers);   // Get all Users (optional filtering by category)

// router.route('/api/users/me')
//   .get(getUser)  
       // Get a specific User by ID
//   .put(updateUser)    // Update an existing User
//   .delete(deleteUser); // Delete a User

export default router;

