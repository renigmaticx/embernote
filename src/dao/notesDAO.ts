import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';
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

	static async getNotes(id: string) {
		try {
			const result = await notes.findOne(
				{ _id: id },
				{ projection: { notes_list: 1 } }
			);
			return result;
		} catch (e) {
			console.error(`Unable to issue findOne command, ${e}`);
		}
	}

	static async addNote(
		userId: string,
		title: string,
		content: string,
		date: string
	) {
		try {
			const result = await notes.updateOne(
				{ _id: userId },
				{
					$setOnInsert: { _id: userId },
					$push: {
						notes_list: {
							note_id: ObjectId,
							title: title,
							content: content,
							date: date,
						},
					},
				},
				{ upsert: true }
			);
			return result;
		} catch (e) {
			console.error(`Unable to issue command on addNote, ${e}`);
		}
	}

	static async updateNote(
		userId: string,
		title: string,
		content: string,
		dateModified: Date
	) {
		try {
		} catch (e) {
			console.error(`Unable to issue command on updateNote, ${e}`);
		}
	}

	static async deleteNote(userId: string, noteId: string) {
		try {
		} catch (e) {
			console.error(`Unable to issue command on deleteNote, ${e}`);
		}
	}
}
