import UsersDAO from '../dao/usersDAO';
import { Request, Response } from 'express';
import argon from 'argon2';

export default class UsersController {
	static async login(req: Request, res: Response, next: Function) {
		const { username, password } = req.body;
		console.log(`Log in: ${username}`);
		const user = await UsersDAO.getUser(req.body.username);

		if (user) {
			try {
				if (await argon.verify(user?.password, password)) {
					//generate jwt access token
					res.status(200).send({ userId: user?._id, username: user?.username });
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
		const hash = await argon.hash(password);

		const response = await UsersDAO.registerUser(username, hash);
		//const response = await NotesDAO.getNotes();
		if (response?.upsertedId) {
			res.status(201).json(response);
		} else {
			res.status(409).json(response);
		}
	}

	static async getTest(req: Request, res: Response, next: Function) {
		res.json({ hello: 'universe' });
	}
}
