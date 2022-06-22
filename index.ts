import app from './server';
import * as mongodb from 'mongodb';
import dotenv from 'dotenv';
import NotesDAO from './src/dao/notesDAO';
import UsersDAO from './src/dao/usersDAO';

dotenv.config();
export const {
	NOTES_DB_URI,
	DB_NAME,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
} = process.env as {
	[key: string]: string;
};
const mongoClient: mongodb.MongoClient = new mongodb.MongoClient(NOTES_DB_URI);

const port = process.env.PORT || 8000;

mongoClient
	.connect()
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		//inject DB
		await NotesDAO.injectDB(client);
		await UsersDAO.injectDB(client);
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	});
