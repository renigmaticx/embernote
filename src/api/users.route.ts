import express from 'express';
import UsersController from './users.controller';

const router = express.Router();

router.route('/login').post(UsersController.login);
router.route('/register').post(UsersController.register);
router.route('/token').post(UsersController.getAccessToken);
router.route('/auth').post(UsersController.authenticateToken);
// add register end point

export default router;
