import NotesDAO from './../dao/notesDAO';
import { Response, Request } from 'express';

export default class NotesController {
	static async addNote(req: Request, res: Response, next: Function) {
		const { userId, title, content, date } = req.body;
		const response = await NotesDAO.addNote(userId, title, content, date);
		res.json(response);
	}

	static async getNotes(req: Request, res: Response, next: Function) {
		console.log('getNotes');
		console.log(req.body);
		const response = await NotesDAO.getNotes(req.body.userId);
		console.log(response);
		res.json(response);
	}

	static async deleteNote(req: Request, res: Response, next: Function) {
		throw new Error('Method not implemented.');
	}

	static async updateNote(req: Request, res: Response, next: Function) {
		throw new Error('Method not implemented.');
	}
}
