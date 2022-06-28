import UsersDAO from '../dao/usersDAO';
import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import * as jwtHelper from './../helpers/jwt.helper';
import { JsonWebTokenError } from 'jsonwebtoken';

export default class UsersController {
	static async token(req: Request, res: Response, next: Function) {}

	//generates a valid expiring accessToken when user has a refreshToken
	static async getAccessToken(req: Request, res: Response, next: Function) {
		const username = req.body.username;
		const refreshToken = req.body.refreshToken;
		console.log(`getAccessToken: ${username} ${refreshToken}`);
		if (!refreshToken) return res.sendStatus(401);

		//get refreshTokens from db
		const result = await UsersDAO.getRefreshToken(username, refreshToken);
		if (!result) return res.sendStatus(403);
		//if refresh token is valid, verify the jwt
		const user = jwtHelper.VerifyToken(refreshToken, 'refresh');
		//using the payload generate the accessToken
		const accessToken = jwtHelper.GenerateAccessToken(
			{ _id: user?._id, username: user?.username },
			'60s'
		);
		res.json({
			accessToken: accessToken,
		});
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
					//generate refresh token and store the refresh token to db
					const refreshToken = jwtHelper.GenerateRefreshToken({
						_id: user._id,
						username: user.username,
					});
					const result = UsersDAO.addRefreshToken(username, refreshToken);
					res.status(200).send({
						userId: user._id,
						username: user.username,
						refreshToken: refreshToken,
					});
				} else {
					res.status(401).send('Unauthorized');
				}
			} catch (error) {
				console.error(`An error occured, ${error}`);
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

	// using header `Authorization: Bearer TOKEN` to verify if the token is valid.
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

		//do not forget this next
		res.sendStatus(200);
		//next();
	}

	static async getTest(req: Request, res: Response, next: Function) {
		res.json({ hello: 'universe' });
	}
}
