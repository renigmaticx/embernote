import { ObjectId } from 'mongodb';

export default class Note {
	constructor(
		public title: string,
		public content: string,
		public id?: ObjectId
	) {}
}
