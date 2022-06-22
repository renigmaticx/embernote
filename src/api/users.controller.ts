import UsersDAO from '../dao/usersDAO';
import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import * as jwtHelper from './../helpers/jwt.helper';

export default class UsersController {
	static async token(req: Request, res: Response, next: Function) {}

	static async getAccessToken(req: Request, res: Response, next: Function) {
		console.log('getAccessToken');

		if (!req.user) return res.sendStatus(401);
		const refreshToken = jwtHelper.GenerateRefreshToken(req.user as object);

		//Check the list of valid refreshTokens
		//if(!refreshTokens.includes(refreshToken)) return res.send(403);

		//PASS
		const user = jwtHelper.VerifyToken(refreshToken, 'refresh');
		if (!user) return res.sendStatus(403);
		const accessToken = jwtHelper.GenerateAccessToken(user, '30s');
		res.json({ accessToken });
	}

	static async login(req: Request, res: Response, next: Function) {
		const { username, password } = req.body;

		console.log(`Log in: ${username + ' ' + password}`);
		if (!username && !password) return res.sendStatus(400);
		const user = await UsersDAO.getUser(req.body.username);
		const hash: string = user?.password;
		if (user) {
			try {
				if (await argon2.verify(hash, password)) {
					//generate refresh then => jwt access token
					const token = jwtHelper.GenerateAccessToken(user, '5h');
					res.status(200).send({
						userId: user?._id,
						username: user?.username,
						accessToken: token,
					});
				} else {
					res.status(401).send('Unauthorized');
				}
			} catch (error) {
				console.error(`Password argon2 verification failed ${error}`);
			}
		}
	}

	static async register(req: Request, res: Response, next: Function) {
		const { username, password } = req.body;
		console.log(`Sign up: ${username}`);

		//hash password
		const hash = await argon2.hash(password);

		const response = await UsersDAO.registerUser(username, hash);
		//const response = await NotesDAO.getNotes();
		if (response?.upsertedId) {
			res.status(201).json(response);
		} else {
			res.status(409).json(response);
		}
	}

	static async authenticateToken(req: Request, res: Response, next: Function) {
		console.log('authenticateToken');
		const authHeader = req.headers['authorization'];
		//Authorization-Header: Bearer TOKEN
		const token = authHeader?.split(' ')[1];
		console.log(token);
		if (!token) return res.sendStatus(401);

		const user = jwtHelper.VerifyToken(token, 'access');
		if (!user) return res.sendStatus(403);
		req.user = user;
		console.log(user);
		//set req.user ?? but how
		next();
	}

	static async getTest(req: Request, res: Response, next: Function) {
		res.json({ hello: 'universe' });
	}
}
