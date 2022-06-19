import mongodb from 'mongodb';
import { DB_NAME } from '../..';

let notes: mongodb.Collection;

export default class NotesDAO {
	static async injectDB(conn: mongodb.MongoClient) {
		if (notes) {
			return;
		}
		try {
			notes = conn.db(DB_NAME).collection('notes');
		} catch (e) {
			console.log(`Unable to establish a collection handle in notesDAO: ${e}`);
		}
	}

	static async getNotes() {
		let cursor: mongodb.FindCursor;
		try {
			cursor = notes.find();
			const notesList = await cursor.toArray();
			return notesList;
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
		}
	}
}
