import express from 'express';
import UsersController from './users.controller';

const router = express.Router();

router.route('/login').post(UsersController.login);
router.route('/register').post(UsersController.register);
router.route('/').get(UsersController.getTest);
// add register end point

export default router;
