import mongodb from 'mongodb';
import { DB_NAME } from '../..';

let users: mongodb.Collection;

export default class UsersDAO {
	static async injectDB(conn: mongodb.MongoClient) {
		if (users) {
			return;
		}
		try {
			users = conn.db(DB_NAME).collection('users');
		} catch (e) {
			console.log(`Unable to establish a collection handle in usersDAO: ${e}`);
		}
	}

	static async getUser(username: string) {
		try {
			const user = await users.findOne({ username: username });
			return user;
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
		}
	}

	static async registerUser(username: string, password: string) {
		try {
			const user = await users.updateOne(
				{ username: username },
				{ $setOnInsert: { username: username, password: password } },
				{ upsert: true }
			);
			return user;
		} catch (e) {
			console.error(`Unable to issue insert command, ${e}`);
		}
	}
}
