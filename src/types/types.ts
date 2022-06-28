export type User = {
	_id: string;
	username: string;
	password: string;
	refreshTokens?: [string];
};

export type Note = {
	note_id: string;
	title: string;
	content: string;
	date: Date;
};
