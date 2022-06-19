import NotesDAO from './../dao/notesDAO';
import { Response, Request } from 'express';

export default class NotesController {
	static async apiGetNotes(req: Request, res: Response, next: Function) {
		const response = await NotesDAO.getNotes();
		res.json(response);
	}
}
