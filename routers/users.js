import express from 'express';
import {
  createUser,

} from '../controllers/users.js';

const router = express.Router();

router.route('/api/auth/register')
  .post(createUser) 
// router.route('/api/users/me').post(myProfile)
export default router;

